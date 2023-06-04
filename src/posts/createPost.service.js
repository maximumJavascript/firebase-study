import { auth } from '../firebase-config';
import { baseUrl } from '../constants/api';
import { FetchStore } from '../fetchStore';

class CreatePostService {
  route = '/posts';

  get #authorData() {
    return {
      name: auth.currentUser.displayName,
      id: auth.currentUser.uid,
    };
  }

  createPost = async (postData) => {
    const fetchClient = new FetchStore({
      body: JSON.stringify({ ...postData, author: this.#authorData }),
      route: this.route,
      requiredAuth: true,
      method: 'POST',
      contentType: 'application/json',
    });
    await fetchClient.sendRequest();
  };
}

export const createPostService = new CreatePostService();
