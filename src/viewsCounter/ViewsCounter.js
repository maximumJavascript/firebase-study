import { makeAutoObservable } from 'mobx';
import { authService } from '../auth/auth.service';
import { auth } from '../firebase-config';

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
    const userIdObj = { userId: auth.currentUser.uid };
    try {
      const response = await fetch(`http://localhost:3001/postsT/${postID}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(userIdObj),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log('нихуя не вышло', err);
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
    const observer = new IntersectionObserver(
      this.consolidateInfo,
      this.options
    );

    for (let element of arr) {
      if (element === null) return;
      observer.observe(element.ref?.current);
    }
  };
}
export const viewsCounter = new ViewsCounter();
