import { Component } from 'react';
import { Comment } from '../Comment';
import { commentsListService } from './commentsList.service';
import { observer } from 'mobx-react';
import { ErrorBoundary } from '../../errorBoundary';
import { MessageEmptyComments } from './MessageEmptyComments';
import styles from './CommentsList.module.css';

const CommentsList = observer(
  class CommentsList extends Component {
    componentDidMount() {
      void commentsListService.getComments(this.props.postId, true);
    }

    componentWillUnmount() {
      void commentsListService.resetCommentsListService();
    }

    handleClickMoreComments = () => {
      void commentsListService.getComments(this.props.postId, true);
    };

    render() {
      if (!this.props.postId) return null;
      const { comments, commentsEnded, isLoading } = commentsListService;
      const commentsList = comments.map((comment) => (
        <Comment key={comment.id} commentData={comment} />
      ));
      const showBtnMoreComments = !isLoading && !commentsEnded;
      return (
        <>
          <ErrorBoundary>
            {comments.length ? commentsList : <MessageEmptyComments />}
            {showBtnMoreComments && (
              <button
                type="button"
                className={styles.btnShowMore}
                onClick={this.handleClickMoreComments}
              >
                Больше комментариев
              </button>
            )}
          </ErrorBoundary>
        </>
      );
    }
  }
);

export { CommentsList };
