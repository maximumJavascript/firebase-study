import { Component } from 'react';
import { observer } from 'mobx-react';
import { authService } from '../auth/auth.service';
import { createPostService } from './createPost.service';
import { Navigate } from 'react-router-dom';
import TextArea from '../controls/createPostForm/TextArea/TextArea';
import TitleInput from '../controls/createPostForm/TitleInput/TitleInput';
import CreatePostBtn from '../controls/createPostForm/CreatePostBtn/CreatePostBtn';
import styles from './createPost.module.css';

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
        title: '',
        area: '',
      };
    }

    handleFormSubmit = async (e) => {
      e.preventDefault();
      this.setState((state) => {
        createPostService.createPost({
          title: state.title,
          text: state.area,
          date: date(),
        });
        return { title: '', area: '' };
      });
    };

    handleInput = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
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
            <CreatePostBtn text={'SEND'} />
          </form>
        </div>
      );
    }
  }
);
