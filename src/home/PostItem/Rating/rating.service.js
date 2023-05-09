import { makeObservable, observable, runInAction } from 'mobx';
import { auth } from '../../../firebase-config';
import { baseUrl } from '../../../constants/api';

class RatingService {
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
    if (this.postId === undefined) return;
    try {
      const res = await fetch(`${baseUrl}/ratings/${this.postId}`);
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      return json.ratings;
    } catch (e) {
      throw e;
    }
  };

  getSingleRating = async (userId) => {
    try {
      const res = await fetch(`${baseUrl}/ratings/${this.postId}/${userId}`);
      if (res.status === 404) return false;
      if (!res.ok) throw new Error(res.statusText);
      const rating = await res.json();
      return rating;
    } catch (e) {
      throw e;
    }
  };

  changeRating = async (docId, score) => {
    try {
      const res = await fetch(`${baseUrl}/ratings`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ docId, score }),
      });
      if (!res.ok) throw new Error(res.statusText);
    } catch (e) {
      throw e;
    }
  };

  addRating = async (score) => {
    const userId = auth.currentUser.uid;
    const userRating = await this.getSingleRating(userId);
    if (userRating) {
      await this.changeRating(userRating.id, score);
      // изменили
      return false;
    }

    try {
      const res = await fetch(`${baseUrl}/ratings`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ postId: this.postId, score, userId }),
      });
      if (!res.ok) throw new Error(res.statusText);
      // успешно добавили
      return true;
    } catch (e) {
      throw e;
    }
  };
}

export { RatingService };