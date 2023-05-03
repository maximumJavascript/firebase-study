import { makeObservable, observable, runInAction } from 'mobx';
import { baseUrl } from '../constants/api';

class PostsService {
  data = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  deletePostItem = async (postId) => {
    try {
      const res = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(res.statusText);
      // стоит вместо этого сделать обращение к апи на получение всех постов?
      this.data = this.data.filter((post) => post.id !== postId);
    } catch (e) {
      throw e;
    }
  };

  getPosts = async () => {
    try {
      const res = await fetch(`${baseUrl}/posts`);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      runInAction(() => {
        return (this.data = data.map((doc) => ({
          ...doc,
        })));
      });
    } catch (e) {
      throw e;
    }
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
