import { makeObservable, observable, runInAction } from 'mobx';
import { baseUrl } from '../../constants/api';

class CommentsListService {
  comments = {};

  constructor() {
    makeObservable(this, {
      comments: observable,
    });
  }

  getComments = async (postId) => {
    if (!postId) return;
    const url = new URL(`${baseUrl}/comments`);
    url.searchParams.append('postId', postId);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      runInAction(() => {
        this.comments = { postId, comments: data };
      });
    } catch (e) {
      throw e;
    }
  };
}

export const commentsListService = new CommentsListService();
