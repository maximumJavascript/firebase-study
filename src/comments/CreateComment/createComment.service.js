import { FetchStore } from '../../fetchStore';

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
    return createdComment;
  };
}

export const createCommentService = new CreateCommentService();
