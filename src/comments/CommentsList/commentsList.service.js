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
    try {
      const res = await fetch(`${baseUrl}/comments/${postId}`);
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
