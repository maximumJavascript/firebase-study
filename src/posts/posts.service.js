import { makeObservable, observable, runInAction } from 'mobx';
import { FetchStore } from '../fetchStore';

class PostsService {
  data = [];
  route = '/posts';
  limit = 4;
  offset = {
    markerSec: 0,
    markerNanosec: 0,
  };
  postsEnded = false;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  deletePostItem = async (postId) => {
    const fetchClient = new FetchStore({
      route: this.route,
      requiredAuth: true,
      params: { postId },
      method: 'DELETE',
    });
    await fetchClient.sendRequest();
    this.data = this.data.filter((post) => post.id !== postId);
  };

  addEmptyPosts() {}

  removeEmptyComments() {}

  async getFetchedPosts(requiredMinDelay) {
    const fetchClient = new FetchStore({
      route: this.route,
      searchParams: {
        markerSec: this.offset.markerSec,
        markerNanosec: this.offset.markerNanosec,
        limit: this.limit,
      },
    });

    this.abortController = fetchClient.abortController;
    const fetchedResult = await fetchClient.sendRequest({ requiredMinDelay });

    const posts = fetchedResult.posts;
    posts.forEach((v) => (v.isLoading = false));

    return { fetchSignal: fetchClient.signal, fetchedResult, posts };
  }

  getPosts = async (requiredMinDelay) => {
    this.isLoading = true;
    this.addEmptyPosts();

    const { fetchSignal, fetchedResult, posts } = await this.getFetchedPosts(
      requiredMinDelay
    );

    const { offset, postsEnded } = fetchedResult;

    this.offset = {
      markerSec: offset.markerSec,
      markerNanosec: offset.markerNanosec,
    };

    this.removeEmptyComments();
    this.isLoading = false;

    // не забыть
    void postsEnded;

    if (!fetchSignal.aborted) runInAction(() => (this.data = posts));
  };

  getSinglePost = async (id) => {
    const fetchClient = new FetchStore({ route: this.route, params: { id } });
    const fetchedPost = fetchClient.sendRequest();
    return fetchedPost;
  };
}

export const postsService = new PostsService();
