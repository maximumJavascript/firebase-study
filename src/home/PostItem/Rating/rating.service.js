import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { makeObservable, observable, runInAction } from 'mobx';
import { db, auth } from '../../../firebase-config';

class RatingService {
  _collection = collection(db, 'ratings');
  averageScore = -1;

  constructor(postId) {
    makeObservable(this, {
      averageScore: observable,
    });
    this.postId = postId;
  }

  getAverageScore = async () => {
    const ratings = await this.getRatings(this.postId);
    if (ratings === undefined) return;
    const sum = ratings.reduce((acc, obj) => acc + obj.score, 0);
    const score = sum / ratings.length;
    runInAction(() => {
      return (this.averageScore = isFinite(score) ? score : 0);
    });
  };

  getRatings = async () => {
    const arr = [];
    if (this.postId === undefined) return;
    const q = query(this._collection, where('postId', '==', this.postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
    return arr;
  };

  getSingleRating = async (userId) => {
    let obj;
    const q = query(
      this._collection,
      where('postId', '==', this.postId),
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

  addRating = async (score) => {
    const userId = auth.currentUser.uid;
    const userRating = await this.getSingleRating(userId);
    if (userRating) {
      await this.changeRating(userRating.id, score);
      // изменили
      return false;
    }
    await addDoc(this._collection, {
      postId: this.postId,
      score,
      userId,
    });
    // успешно добавили
    return true;
  };
}

export { RatingService };
