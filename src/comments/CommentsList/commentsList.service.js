import { makeObservable, observable, runInAction, toJS } from 'mobx';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

class CommentsListService {
  comments = {};

  constructor() {
    makeObservable(this, {
      comments: observable,
    });
  }

  getComments = async (postId) => {
    const comments = [];
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    runInAction(() => {
      return (this.comments = { postId, comments });
    });
  };
}

export const commentsListService = new CommentsListService();
