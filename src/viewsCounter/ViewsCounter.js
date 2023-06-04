import { makeAutoObservable } from 'mobx';
import { authService } from '../auth/auth.service';
import { auth } from '../firebase-config';
import { baseUrl } from '../constants/api';
import { FetchStore } from '../fetchStore';

class ViewsCounter {
  viewsCounter = 0;
  route = '/views';
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  updateInfo = async (postID) => {
    if (!auth.currentUser) return false;
    const userId = auth.currentUser.uid;
    const fetchClient = new FetchStore({
      route: this.route,
      method: 'PUT',
      params: { postID },
      searchParams: { userId },
    });
    await fetchClient.sendRequest();
    return true;
  };

  consolidateInfo = (elements) => {
    elements.forEach((post) => {
      if (post.isIntersecting) {
        this.updateInfo(post.target.getAttribute('data-postid'));
      }
    });
  };

  makePostsObservable = (arr) => {
    if (!authService.isAuth) return;
    const observer = new IntersectionObserver(this.consolidateInfo, this.options);

    for (let element of arr) {
      if (element === null) return;
      observer.observe(element.ref?.current);
    }
  };
}
export const viewsCounter = new ViewsCounter();
