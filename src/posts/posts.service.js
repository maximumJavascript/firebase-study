import { makeObservable, observable, runInAction } from 'mobx';
import { FetchStore } from '../fetchStore';

class PostsService {
  data = [];
  route = '/posts';

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

  getPosts = async () => {
    const fetchClient = new FetchStore({ route: '/posts' });
    const data = await fetchClient.sendRequest();
    runInAction(() => {
      return (this.data = data.map((doc) => ({
        ...doc,
      })));
    });
  };

  getSinglePost = async (id) => {
    const fetchClient = new FetchStore({ route: this.route, params: { id } });
    const fetchedPost = fetchClient.sendRequest();
    return fetchedPost;
  };
}

export const postsService = new PostsService();
