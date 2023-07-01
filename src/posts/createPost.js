import { Component } from 'react';
import { observer } from 'mobx-react';
import { authService } from '../auth/auth.service';
import { createPostService } from './createPost.service';
import { Navigate } from 'react-router-dom';
import { TextArea } from '../controls/createPostForm/TextArea/TextArea';
import { TitleInput } from '../controls/createPostForm/TitleInput/TitleInput';
import { CreatePostBtn } from '../controls/createPostForm/CreatePostBtn/CreatePostBtn';
import styles from './createPost.module.css';
import { PhotoUploader } from '../photoUploader/PhotoUploader';
import { Timestamp } from 'firebase/firestore';
import { withRouter } from '../hoc/withRouter';

export const CreatePost = withRouter(
  observer(
    class CreatePost extends Component {
      constructor(props) {
        super(props);
        this.state = {
          title: '',
          area: '',
          base64Img: null,
        };
      }

      handleFormSubmit = async (e) => {
        e.preventDefault();
        const { title, area, base64Img } = this.state;
        this.setState({ title: '', area: '' });
        const createdPost = await createPostService.createPost({
          title,
          base64Img,
          text: area,
          date: Timestamp.fromDate(new Date()),
        });
        this.props.navigate(`/comments/${createdPost.id}`);
      };

      handleInput = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };

      getCode = (file) => {
        this.setState({ base64Img: file });
      };

      render() {
        if (!authService.isAuth) return <Navigate to="/login" />;
        return (
          <div className={styles.createPostWindow}>
            <form className={styles.createPostContainer} onSubmit={this.handleFormSubmit}>
              <h2 className={styles.postTitle}>FORM</h2>
              <TitleInput
                onChange={this.handleInput}
                value={this.state.title}
                placeholder="Title post"
                name="title"
              />
              <TextArea
                onChange={this.handleInput}
                value={this.state.area}
                placeholder="Text post"
                name="area"
              />
              <PhotoUploader getCode={this.getCode} />
              <CreatePostBtn text={'SEND'} />
            </form>
          </div>
        );
      }
    }
  )
);
