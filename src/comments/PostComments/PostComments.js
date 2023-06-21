import { observer } from 'mobx-react';
import { Component } from 'react';
import { postCommentsService } from './postComments.service';
import { PostItem } from '../../home/PostItem';
import navStyles from '../../header/Header.module.css';
import { CommentsList } from '../CommentsList';
import { CreateComment } from '../CreateComment';
import styles from './PostComments.module.css';
import classNames from 'classnames';

export const PostComments = observer(
  class PostComments extends Component {
    constructor(props) {
      super(props);
      this.id = window.location.hash.split('/').at(-1);
    }

    componentDidMount() {
      void postCommentsService.getPost(this.id);
    }

    componentWillUnmount() {
      void postCommentsService.resetPostComments();
    }

    render() {
      const post = postCommentsService.post;
      const postStyles = classNames(navStyles.navbarContainer, styles.commentsWrap);
      return (
        <div className={postStyles}>
          <div className={styles.commentsPost}>
            <PostItem post={post} withComments />
          </div>
          <div className={styles.commentsActionWrap}>
            <CreateComment postId={this.id} />
            <div className={styles.commentsList}>
              <CommentsList postId={this.id} />
            </div>
          </div>
        </div>
      );
    }
  }
);
