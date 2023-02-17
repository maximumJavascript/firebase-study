import { Component } from 'react';
import { observer } from 'mobx-react';
import { authService } from '../auth/auth.service';
import { createPostService } from './createPost.service';
import { Navigate } from 'react-router-dom';
import TextArea from '../controls/createPostForm/TextArea/TextArea';
import TitleInput from '../controls/createPostForm/TitleInput/TitleInput';
import CreatePostBtn from '../controls/createPostForm/CreatePostBtn/CreatePostBtn';
import styles from './createPost.module.css';

export const CreatePost = observer(
  class CreatePost extends Component {
    constructor(props) {
      super(props);
      this.state = {
        titleValue: '',
        areaValue: '',
      };
    }

    handleFormSubmit = async (e) => {
      e.preventDefault();
      this.setState((state) => {
        createPostService.handleCreatePost({
          title: state.titleValue,
          text: state.areaValue,
        });
        return { titleValue: '', areaValue: '' };
      });
    };

    handleInput = (e) => {
      this.setState({
        [e.target.name + 'Value']: e.target.value,
      });
    };

    render() {
      if (!authService.isAuth) return <Navigate to="/login" />;
      return (
        <div className={styles.createPostWindow}>
          <form className={styles.createPostContainer} onSubmit={this.handleFormSubmit}>
            <h2 className={styles.postTitle}>FORM</h2>
            <TitleInput
              onChange={this.handleInput}
              value={this.state.titleValue}
              placeholder="Title post"
            />
            <TextArea
              onChange={this.handleInput}
              value={this.state.areaValue}
              placeholder="Text post"
            />
            <CreatePostBtn text={'SEND'} />
          </form>
        </div>
      );
    }
  }
);
