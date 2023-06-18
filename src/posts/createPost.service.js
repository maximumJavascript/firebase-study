import { auth } from '../firebase-config';
import { FetchStore } from '../fetchStore';

class CreatePostService {
  #route = '/posts';

  createPost = async (postData) => {
    const fetchClient = new FetchStore({
      body: JSON.stringify({ ...postData, authorId: auth.currentUser.uid }),
      route: this.#route,
      requiredAuth: true,
      method: 'POST',
      contentType: 'application/json',
    });
    await fetchClient.sendRequest();
  };
}

export const createPostService = new CreatePostService();
