import { Component } from 'react';
import { Comment } from '../Comment/Comment';
import { commentsListService } from './commentsList.service';

const CommentsList = class CommentsList extends Component {
  componentDidMount() {
    void commentsListService.getComments(this.props.postId);
  }

  render() {
    const commentList = commentsListService.comments;
    if (commentList.postId !== this.props.postId) return null;
    return (
      <>
        {commentList.comments.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}
      </>
    );
  }
};

export { CommentsList };
