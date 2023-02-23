import { collection, getDocs, query, where } from 'firebase/firestore';
import { makeObservable, observable, runInAction } from 'mobx';
import { db } from '../../../firebase-config';

class RatingService {
  _collection = collection(db, 'ratings');
  averageScore = 0;

  constructor() {
    makeObservable(this, {
      averageScore: observable,
    });
  }

  getAverageScore = async (postId) => {
    const ratings = await this.findRatings(postId);
    const sum = ratings.reduce((acc, obj) => acc + obj.score, 0);
    if (!ratings.length) return 0;
    return Math.round(sum / ratings.length);
  };

  findRatings = async (postId) => {
    const arr = [];
    const q = query(this._collection, where('postId', '==', postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
    return arr;
  };
}

export const ratingService = new RatingService();
