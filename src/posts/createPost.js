import { Component } from 'react';
import { observer } from 'mobx-react';
import { authService } from '../auth/auth.service';
import { createPostService } from './createPost.service';
import { Navigate } from 'react-router-dom';
import TextArea from '../controls/createPostForm/TextArea/TextArea';
import TitleInput from '../controls/createPostForm/TitleInput/TitleInput';
import CreatePostBtn from '../controls/createPostForm/CreatePostBtn/CreatePostBtn';
import styles from './createPost.module.css';
import PhotoUploader from '../photoUploader/PhotoUploader';
function date() {
  let d = new Date();
  return (
    ('0' + d.getDate()).slice(-2) +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    d.getFullYear() +
    ' ' +
    ('0' + d.getHours()).slice(-2) +
    ':' +
    ('0' + d.getMinutes()).slice(-2)
  );
}
export const CreatePost = observer(
  class CreatePost extends Component {
    constructor(props) {
      super(props);
      this.state = {
        titleValue: '',
        areaValue: '',
        base64Img: null,
      };
    }

    handleFormSubmit = async (e) => {
      e.preventDefault();
      this.setState((state) => {
        createPostService.handleCreatePost({
          title: state.titleValue,
          text: state.areaValue,
          date: date(),
          base64Img: state.base64Img,
        });
        return { titleValue: '', areaValue: '' };
      });
    };

    handleInput = (e) => {
      this.setState({
        [e.target.name + 'Value']: e.target.value,
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
            <TitleInput onChange={this.handleInput} value={this.state.titleValue} />
            <TextArea onChange={this.handleInput} value={this.state.areaValue} />
            <PhotoUploader getCode={this.getCode} />
            <CreatePostBtn />
          </form>
        </div>
      );
    }
  }
);
