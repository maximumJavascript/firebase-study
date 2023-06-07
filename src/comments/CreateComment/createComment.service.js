import { FetchStore } from '../../fetchStore';
import { commentsListService } from '../CommentsList/commentsList.service';

class CreateCommentService {
  route = '/comments';

  createComment = async (commentData) => {
    const fetchClient = new FetchStore({
      body: JSON.stringify(commentData),
      route: this.route,
      method: 'POST',
      requiredAuth: true,
      contentType: 'application/json',
    });
    const createdComment = await fetchClient.sendRequest();
    commentsListService.addCreatedComment(createdComment);
  };
}

export const createCommentService = new CreateCommentService();
