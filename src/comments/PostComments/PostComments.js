import { observer } from 'mobx-react';
import { Component } from 'react';
import { postCommentsService } from './postComments.service';
import { PostItem } from '../../home/PostItem';
import { CommentsList } from '../CommentsList';
import { CreateComment } from '../CreateComment';
import styles from './PostComments.module.css';
import { withWindowWidth } from '../../hoc/withWindowWidth';
import { Spring, config, animated } from '@react-spring/web';

const PostItemWithWindowWidth = withWindowWidth(PostItem);

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

      const springConfig = {
        from: { marginTop: '-100%' },
        to: { marginTop: '0px' },
        config: config.default,
      };

      return (
        <Spring {...springConfig}>
          {(s) => (
            <animated.div
              style={s}
              className={styles.commentsWrap}
              ref={this.props.myRef}
            >
              <div className={styles.commentsPost}>
                <PostItemWithWindowWidth
                  post={post}
                  onModalClose={this.props.onModalClose}
                  withComments
                />
              </div>
              <div className={styles.commentsActionWrap}>
                <CreateComment postId={this.id} />
                <div className={styles.commentsList}>
                  <CommentsList postId={this.id} />
                </div>
              </div>
            </animated.div>
          )}
        </Spring>
      );
    }
  }
);
