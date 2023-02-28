import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { makeObservable, observable } from 'mobx';
import { db, auth } from '../../../firebase-config';

class RatingService {
  _collection = collection(db, 'ratings');
  averageScore = {};

  constructor() {
    makeObservable(this, {
      averageScore: observable,
    });
  }

  getAverageScore = async (postId) => {
    const ratings = await this.getRatings(postId);
    const sum = ratings.reduce((acc, obj) => acc + obj.score, 0);
    const score = sum / ratings.length;
    return isFinite(score) ? score : 0;
  };

  getRatings = async (postId) => {
    const arr = [];
    const q = query(this._collection, where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
    return arr;
  };

  getSingleRating = async (postId, userId) => {
    let obj;
    const q = query(
      this._collection,
      where('postId', '==', postId),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      obj = {
        id: doc.id,
        ...doc.data(),
      };
    });
    return obj;
  };

  changeRating = async (docId, newScore) => {
    const ref = doc(db, 'ratings', docId);
    await updateDoc(ref, { score: newScore });
  };

  addRating = async (postId, score) => {
    const userId = auth.currentUser.uid;
    const userRating = await this.getSingleRating(postId, userId);
    if (userRating) {
      await this.changeRating(userRating.id, score);
      // изменили
      return false;
    }
    await addDoc(this._collection, {
      postId,
      score,
      userId,
    });
    // успешно добавили
    return true;
  };
}

export { RatingService };
