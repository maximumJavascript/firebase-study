import { makeAutoObservable } from 'mobx';
import { db } from '../firebase-config';
import { updateDoc, doc } from 'firebase/firestore';
class ViewsCounter {
  viewsCounter = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increment = () => {
    this.viewsCounter = this.viewsCounter + 1;
  };
  // updateDoc = async (docId) => {
  // const comment = doc(db, 'posts', docId);
  // await updateDoc(comment, {
  // test: true,
  // });
  // };
}

export const viewsCounter = new ViewsCounter();
