import { makeAutoObservable } from 'mobx';
import { authService } from '../auth/auth.service';
import { auth } from '../firebase-config';
import { baseUrl } from '../constants/api';

class ViewsCounter {
  viewsCounter = 0;
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  updateInfo = async (postID) => {
    const userId = auth.currentUser?.uid || '';
    try {
      const res = await fetch(`${baseUrl}/views/${postID}/$${userId}`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error(res.statusText);
      return true;
    } catch (e) {
      throw e;
    }
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
