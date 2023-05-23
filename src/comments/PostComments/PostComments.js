import { observer } from 'mobx-react';
import { Component } from 'react';
import { commentsService } from './postComments.service';
import { PostItem } from '../../home/PostItem';
import navStyles from '../../header/Navbar.module.css';
import { CommentsList } from '../CommentsList';
import { CreateComment } from '../CreateComment';
import styles from './PostComments.module.css';
import homeStyles from '../../home/home.module.css';
import classNames from 'classnames';

export const PostComments = observer(
  class PostComments extends Component {
    constructor(props) {
      super(props);
      this.id = window.location.hash.split('/').at(-1);
    }

    componentDidMount() {
      void commentsService.getPost(this.id);
    }

    render() {
      const post = commentsService.post;
      if (post.id !== this.id) return null;
      const postStyles = classNames(navStyles.navbarContainer, styles.commentsWrap);
      return (
        <div className={postStyles}>
          <div className={`${homeStyles.homePage} ${styles.commentsPost}`}>
            <PostItem
              post={post}
              isComments={true}
              viewCounter={post.viewedBy?.length}
              date={post.date.seconds}
            />
          </div>
          <div className={styles.commentsActionWrap}>
            <CreateComment postId={post.id} />
            <div className={styles.commentsList}>
              <CommentsList postId={post.id} />
            </div>
          </div>
        </div>
      );
    }
  }
);
