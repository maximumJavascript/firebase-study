import { action, makeObservable, observable, runInAction } from 'mobx';
import { baseUrl } from '../../constants/api';

class CommentsListService {
  postId = '';
  offset = 0;
  limit = 3;
  comments = [];

  constructor() {
    makeObservable(this, {
      comments: observable,
      addEmptyComments: action,
    });
  }

  addEmptyComments() {
    for (let i = 0; i < this.limit; i++) {
      this.comments.push({ isLoading: true, id: this.comments.length });
    }
  }

  getComments = async (postId, cbAbort) => {
    this.postId = postId;
    this.addEmptyComments();
  };
}

export const commentsListService = new CommentsListService();
