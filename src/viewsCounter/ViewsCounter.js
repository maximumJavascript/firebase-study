import { makeAutoObservable } from 'mobx';
import { db } from '../firebase-config';
import { updateDoc, doc, arrayUnion, setDoc } from 'firebase/firestore';
import storageService from '../localStorageService/storageService';
import { async } from '@firebase/util';
import { useRef } from 'react';
import { toJS } from 'mobx';

class ViewsCounter {
  viewsCounter = 0;
  mySet = new Set();
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
  constructor() {
    makeAutoObservable(this);
  }

  updateInfo = async (userId, postID) => {
    const postRef = doc(db, 'posts', postID);
    updateDoc(postRef, { viewedBy: [userId] });
  };
  consolidateInfo = (elements, info) => {
    elements.forEach((post) => {
      if (post.isIntersecting) {
        this.updateInfo(
          storageService.getUserIdFromStorage(),
          post.target.getAttribute('postid')
        );
      }
    });
  };
  arrWithRefs = (arr) => {
    let observer = new IntersectionObserver(this.consolidateInfo, this.options);
    arr.forEach((element) => observer.observe(element.ref));
  };
}
export const viewsCounter = new ViewsCounter();
