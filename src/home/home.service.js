import { POSTS_SCROLL_THRESHOLD } from '../constants/posts';
import { postsService } from '../posts/posts.service';

class HomeService {
  posts = postsService;

  resetHomeService() {
    this.posts.resetPosts();
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const distanceFromBottom =
      document.body.getBoundingClientRect().bottom - window.innerHeight;
    const { posts } = this;

    const isTresholdHeight = distanceFromBottom <= POSTS_SCROLL_THRESHOLD;
    const requestNewPosts = isTresholdHeight && !posts.isLoading && !posts.postsEnded;

    if (requestNewPosts) {
      posts.getPosts();
    }
  };

  listenScrollToGetPosts() {
    window.addEventListener('scroll', this.handleScroll);
  }
}

export const homeService = new HomeService();
