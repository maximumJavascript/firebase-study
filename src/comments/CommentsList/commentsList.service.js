import { makeObservable, observable, runInAction } from 'mobx';

class CommentsListService {
  comments = {};

  constructor() {
    makeObservable(this, {
      comments: observable,
    });
  }

  getComments = async (postId) => {
    if (postId === undefined) return;
    if (!Object.keys(postId).length) return;
    try {
      const response = await fetch(`http://localhost:3001/comments/${postId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      runInAction(() => {
        this.comments = { postId, comments: data };
      });
    } catch (err) {
      console.log('нихуя не вышло', err);
    }
  };
}

export const commentsListService = new CommentsListService();
