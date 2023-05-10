import { makeObservable, observable, runInAction } from 'mobx';
import { baseUrl } from '../constants/api';
import { auth } from '../firebase-config';

class PostsService {
  data = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  deletePostItem = async (postId) => {
    if (!auth.currentUser) throw new Error('Not authorized');
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(`${baseUrl}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!res.ok) throw new Error(res.statusText);
    this.data = this.data.filter((post) => post.id !== postId);
  };

  getPosts = async () => {
    const res = await fetch(`${baseUrl}/posts`);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    runInAction(() => {
      return (this.data = data.map((doc) => ({
        ...doc,
      })));
    });
  };

  getSinglePost = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/posts/${id}`);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      return data;
    } catch (e) {
      throw e;
    }
  };
}

export const postsService = new PostsService();
