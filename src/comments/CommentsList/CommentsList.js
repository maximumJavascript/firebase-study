import { Component } from 'react';
import { Comment } from '../Comment';
import { commentsListService } from './commentsList.service';
import { observer } from 'mobx-react';
import { ErrorBoundary } from '../../errorBoundary';

const CommentsList = observer(
  class CommentsList extends Component {
    componentDidMount() {
      void commentsListService.getComments(this.props.postId);
    }

    render() {
      const commentList = commentsListService.comments;
      if (commentList.postId !== this.props.postId) return null;
      if (!commentList.comments || !this.props.postId) return null;
      return (
        <>
          <ErrorBoundary>
            {commentList.comments.map((comment) => (
              <Comment key={comment.id} data={comment} />
            ))}
          </ErrorBoundary>
        </>
      );
    }
  }
);

export { CommentsList };
