import { Component } from 'react';
import { observer } from 'mobx-react';
import { authService } from '../../auth/auth.service';
import { createCommentService } from './createComment.service';
import { CommentLoginButton } from '../../controls/CommentLoginButton/CommentLoginButton';
import { TextArea } from '../../controls/createPostForm/TextArea/TextArea';
import { CreatePostBtn } from '../../controls/createPostForm/CreatePostBtn/CreatePostBtn';
import styles from './CreateComment.module.css';
import { auth } from '../../firebase-config';
import { Timestamp } from '@firebase/firestore';
import { commentsListService } from '../CommentsList/commentsList.service';

const CreateComment = observer(
  class CreateComment extends Component {
    constructor(props) {
      super(props);
      this.state = {
        areaValue: '',
      };
    }

    handleAuth = () => {
      authService.handleLogin();
    };

    handleAreaChange = (e) => {
      this.setState({ areaValue: e.target.value });
    };

    handleSendComment = (e) => {
      e.preventDefault();
      this.setState((state) => {
        createCommentService
          .createComment({
            text: state.areaValue,
            postId: this.props.postId,
            date: Timestamp.fromDate(new Date()),
            authorId: auth.currentUser.uid,
          })
          .then((res) => commentsListService.getComments(res.postId));
        return { areaValue: '' };
      });
    };
    render() {
      if (!authService.isAuth)
        return (
          <CommentLoginButton
            onClick={this.handleAuth}
            text={'Чтобы оставлять комментарии, авторизуйтесь'}
          />
        );
      return (
        <form onSubmit={this.handleSendComment} className={styles.CreateComment}>
          <TextArea
            className={styles.commentInput}
            placeholder="Comment text"
            value={this.state.areaValue}
            onChange={this.handleAreaChange}
          />
          <div>
            <CreatePostBtn className={styles.commentButton} text="Send" />
          </div>
        </form>
      );
    }
  }
);

export { CreateComment };
