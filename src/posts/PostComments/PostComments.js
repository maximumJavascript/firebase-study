import { observer } from 'mobx-react';
import { Component } from 'react';
import { commentsService } from './postComments.service';
import PostItem from '../../home/PostItem';
import homeStyles from '../../home/home.module.css';
import styles from './PostComments.module.css';
import CommentsList from '../CommentsList';

const PostComments = observer(
  class PostComments extends Component {
    constructor(props) {
      super(props);
      // не нашёл как это лучше сделать для классовых компонентов с 6 версией роутера
      this.id = window.location.pathname.split('/')[2];
    }

    componentDidMount() {
      void commentsService.getPost(this.id);
    }

    render() {
      const post = commentsService.post;
      if (post.id !== this.id) return null;
      return (
        <div
          className={`${homeStyles.container} ${homeStyles.home} ${styles.commentsWrap}`}
        >
          <div className={`${homeStyles.homePage} ${styles.commentsPost}`}>
            <PostItem post={post} isComments={true} />
          </div>
          <div className={styles.commentsList}>
            <CommentsList postId={post.id} />
          </div>
        </div>
      );
    }
  }
);

export { PostComments };
