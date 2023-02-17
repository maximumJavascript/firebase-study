import { makeObservable, observable, runInAction } from 'mobx';
import { postsService } from '../posts.service';

class CommentsService {
  post = {};

  constructor() {
    makeObservable(this, {
      post: observable,
    });
  }

  getPost = async (id) => {
    const post = await postsService.getSinglePost(id);
    runInAction(() => {
      return (this.post = { ...post, id });
    });
  };
}

export const commentsService = new CommentsService();
