import { Component } from 'react';
import { Comment } from '../Comment';
import { commentsListService } from './commentsList.service';
import { observer } from 'mobx-react';
import { ErrorBoundary } from '../../errorBoundary';
import { MessageEmptyComments } from './MessageEmptyComments';
import { CommentSkeleton } from '../../skeletons/CommentSkeleton';

const CommentsList = observer(
  class CommentsList extends Component {
    componentDidMount() {
      void commentsListService.getComments(this.props.postId);
    }

    render() {
      const commentList = commentsListService.comments;
      if (commentList.postId !== this.props.postId) return null;
      if (!commentList.comments || !this.props.postId) return null;
      const comments = commentList.comments.map((comment) => (
        <CommentSkeleton key={comment.id} data={comment} />
      ));
      return (
        <>
          <ErrorBoundary>
            {comments.length ? comments : <MessageEmptyComments />}
          </ErrorBoundary>
        </>
      );
    }
  }
);

export { CommentsList };
