import { observer } from 'mobx-react';
import { Component } from 'react';
import { commentsService } from './postComments.service';
import { matchPath } from 'react-router-dom';
import PostItem from '../../home/PostItem';
import homeStyles from '../../home/home.module.css';
import styles from './PostComments.module.css';
import CommentsList from '../CommentsList';
import CreateComment from '../CreateComment';
import { toJS } from 'mobx';
import classNames from 'classnames';

const PostComments = observer(
  class PostComments extends Component {
    constructor(props) {
      super(props);
      const match = matchPath(
        {
          path: '/comments/:id',
        },
        window.location.pathname
      );
      this.id = match?.params.id;
    }

    componentDidMount() {
      void commentsService.getPost(this.id);
    }

    render() {
      const post = commentsService.post;
      if (post.id !== this.id) return null;
      const postStyles = classNames(
        homeStyles.container,
        homeStyles.home,
        styles.commentsWrap
      );
      return (
        <div className={postStyles}>
          <div className={`${homeStyles.homePage} ${styles.commentsPost}`}>
            <PostItem
              post={post}
              isComments={true}
              viewCounter={post.viewedBy.length}
              date={post.date}
            />
          </div>
          <div>
            <CreateComment postId={post.id} />
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
