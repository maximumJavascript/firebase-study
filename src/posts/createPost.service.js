import { auth } from '../firebase-config';
import { baseUrl } from '../constants/api';

class CreatePostService {
  get #authorData() {
    return {
      name: auth.currentUser.displayName,
      id: auth.currentUser.uid,
    };
  }

  createPost = async (postData) => {
    if (!auth.currentUser) throw new Error('Not authorized');
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(`${baseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ ...postData, author: this.#authorData }),
    });
    if (!res.ok) throw new Error(res.statusText);
  };
}

export const createPostService = new CreatePostService();
