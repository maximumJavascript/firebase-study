import { collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { makeObservable, observable, runInAction } from 'mobx';
import { baseUrl } from '../constants/api';

class PostsService {
  _collection = collection(db, 'posts');
  data = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  deletePostItem = async (postId) => {
    const url = new URL(`${baseUrl}/posts/delete`);
    url.searchParams.append('postId', postId);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.status !== 204) throw new Error('Not deleted');
      // стоит вместо этого сделать обращение к апи на получение всех постов?
      this.data = this.data.filter((post) => post.id !== postId);
    } catch (error) {
      throw error;
    }
  };

  getPosts = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts`);
      const data = await response.json();
      runInAction(() => {
        return (this.data = data.map((doc) => ({
          ...doc,
        })));
      });
    } catch (error) {
      throw error;
    }
  };

  getSinglePost = async (id) => {
    const url = new URL(`${baseUrl}/posts/getSinglePost`);
    url.searchParams.append('id', id);
    try {
      const response = await fetch(url);
      if (response.status !== 200) throw new Error(response.statusText);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
}

export const postsService = new PostsService();
