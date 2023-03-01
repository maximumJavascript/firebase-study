import { makeAutoObservable } from 'mobx';
import { db } from '../firebase-config';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
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

  updateInfo = (elements, info) => {
    elements.forEach((post) => {
      if (post.isIntersecting) {
        console.log(post.target);
      }
    });
  };
  arrWithRefs = (arr) => {
    let observer = new IntersectionObserver(this.updateInfo, this.options);
    arr.forEach((element) => {
      observer.observe(element);
    });
  };
}
export const viewsCounter = new ViewsCounter();
