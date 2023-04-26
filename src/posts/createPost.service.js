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
    try {
      const res = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...postData, author: this.#authorData }),
      });
      if (!res.ok) throw new Error(res.statusText);
    } catch (e) {
      throw e;
    }
  };
}

export const createPostService = new CreatePostService();
