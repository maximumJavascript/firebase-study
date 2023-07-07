import { makeObservable, observable, runInAction, toJS } from 'mobx';
import { postsService } from '../../posts/posts.service';

class PostCommentsService {
  post = {
    isLoading: true,
  };

  abortController = new AbortController();

  constructor() {
    makeObservable(this, {
      post: observable,
    });
  }

  resetPostComments() {
    this.abortController.abort();
    this.abortController = new AbortController();
    runInAction(() => (this.post = { isLoading: true }));
  }

  getPost = async (postId) => {
    const existPost = postsService.data.find(({ id }) => id === postId);

    if (existPost) {
      return runInAction(() => (this.post = { ...existPost, id: postId }));
    }

    const post = await postsService.getSinglePost({
      id: postId,
      requiredMinDelay: true,
      signal: this.abortController.signal,
    });

    this.abortController = new AbortController();
    runInAction(() => (this.post = { ...post, id: postId, isLoading: false }));
  };
}

export const postCommentsService = new PostCommentsService();
