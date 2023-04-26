import { db } from '../../../firebase-config';
import { makeObservable, observable, runInAction, toJS } from 'mobx';
import { query, where, getDocs, addDoc, collection } from 'firebase/firestore';

class AnswerService {
  _collection = collection(db, 'answers');
  answers = [];

  constructor() {
    makeObservable(this, {
      answers: observable,
    });
  }

  createAnswer = async (answerData) => {
    await addDoc(this._collection, answerData);
  };

  getAnswers = async (commentId) => {
    // console.log('this.answers', toJS(this.answers));
    if (this.answers.length != 0) {
      this.answers = [];
    }
    const q = query(
      collection(db, 'answers'),
      where('commentId', '==', commentId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.answers.push({ id: doc.id, ...doc.data() });
    });
    runInAction(() => {
      return this.answers;
    });
  };
}

export const answerService = new AnswerService();
