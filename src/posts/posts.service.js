import { collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import { makeObservable, observable, runInAction } from 'mobx';
import { baseUrl } from '../constants/api';

class PostsService {
  _collection = collection(db, 'posts');
  data = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
    this.data = [];
  }
  deletePostItem = async (postId) => {
    try {
      const response = await fetch(`${baseUrl}/deletePost/${postId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error(error);
    }
    this.data = this.data.filter((post) => post.id !== postId);
  };

  getPosts = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      runInAction(() => {
        return (this.data = data.map((doc) => ({
          ...doc,
        })));
      });
    } catch (err) {
      console.log('нихуя не вышло', err);
    }
  };

  getSinglePost = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/posts/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log('нихуя не вышло', err);
    }
  };
}

export const postsService = new PostsService();
