import { makeObservable, observable, runInAction } from 'mobx';
import { baseUrl } from '../constants/api';
import { auth } from '../firebase-config';
import { FetchService } from '../fetchService/fetchService';

class PostsService {
  data = [];
  fetchService = new FetchService('/posts');

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
    const fetchEntity = this.fetchService.getFetchEntity();
    const data = await fetchEntity.getFetchResult();
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
