import { Component } from 'react';
import { Comment } from '../Comment/Comment';
import { commentsListService } from './commentsList.service';
import { observer } from 'mobx-react';
import { AnswerToCommentList } from '../AnswerToCommentList/AnswerToCommentList';
import { toJS } from 'mobx';
const CommentsList = observer(
  class CommentsList extends Component {
    componentDidMount() {
      void commentsListService.getComments(this.props.postId);
    }

    render() {
      const commentList = commentsListService.comments;
      console.log(toJS(commentList));
      if (commentList.postId !== this.props.postId) return null;
      return (
        <>
          {commentList.comments.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
        </>
      );
    }
  }
);

export { CommentsList };
