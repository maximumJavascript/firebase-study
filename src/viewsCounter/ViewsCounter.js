import { makeAutoObservable } from 'mobx';
import { db } from '../firebase-config';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import storageService from '../localStorageService/storageService';
import { async } from '@firebase/util';
import { useRef } from 'react';

class ViewsCounter {
  viewsCounter = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increment = () => {
    this.viewsCounter = this.viewsCounter + 1;
  };
  updateViewsInfo = (postId) => {
    let loggedAuthor = storageService.getUserIdFromStorage();
    // console.log(post, loggedAuthor);
    const test = async (e) => {
      await updateDoc(doc(db, 'users', loggedAuthor), {
        viewedPosts: arrayUnion(postId),
      });
    };
    test();
  };

  //   const db = getFirestore();
  // async (e) => { //...
  //  await updateDoc(doc(db, "users", doc.id), {
  //     foo: 'bar'
  //   });
  // //....

  // updateDoc = async (docId) => {
  // const comment = doc(db, 'posts', docId);
  // await updateDoc(comment, {
  // test: true,
  // });
  // };
}

export const viewsCounter = new ViewsCounter();
