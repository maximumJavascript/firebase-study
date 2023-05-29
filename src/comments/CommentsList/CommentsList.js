import { Component } from 'react';
import { Comment } from '../Comment';
import { commentsListService } from './commentsList.service';
import { observer } from 'mobx-react';
import { ErrorBoundary } from '../../errorBoundary';
import { MessageEmptyComments } from './MessageEmptyComments';
import { toJS } from 'mobx';

const CommentsList = observer(
  class CommentsList extends Component {
    componentDidMount() {
      void commentsListService.getComments(this.props.postId, true);
    }

    componentWillUnmount() {
      void commentsListService.resetCommentsList();
    }

    render() {
      const commentList = commentsListService.comments;
      if (!this.props.postId) return null;
      const comments = commentList.map((comment) => (
        <Comment key={comment.id} commentData={comment} />
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
