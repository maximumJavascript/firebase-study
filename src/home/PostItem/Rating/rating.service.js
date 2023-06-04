import { makeObservable, observable, runInAction } from 'mobx';
import { auth } from '../../../firebase-config';
import { FetchStore } from '../../../fetchStore';

class RatingService {
  route = '/ratings';
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
    const fetchClient = new FetchStore({
      route: this.route,
      params: { postId: this.postId },
    });
    const fetchedRatings = await fetchClient.sendRequest();
    return fetchedRatings.ratings;
  };

  getSingleRating = async (userId) => {
    const fetchClient = new FetchStore({
      route: this.route,
      params: { postId: this.postId, userId },
    });
    try {
      const fetchedRating = await fetchClient.sendRequest();
      return fetchedRating;
    } catch (e) {
      if (fetchClient.status === 404) return false;
      throw new Error(e);
    }
  };

  changeRating = async (docId, score) => {
    const fetchClient = new FetchStore({
      body: JSON.stringify({ docId, score }),
      route: this.route,
      method: 'PUT',
      requiredAuth: true,
      contentType: 'application/json',
    });
    await fetchClient.sendRequest();
  };

  addRating = async (score) => {
    const userId = auth.currentUser.uid;
    const userRating = await this.getSingleRating(userId);
    if (userRating) {
      await this.changeRating(userRating.id, score);
      // изменили
      return false;
    }

    const fetchClient = new FetchStore({
      body: JSON.stringify({ postId: this.postId, score, userId }),
      route: this.route,
      requiredAuth: true,
      method: 'POST',
      contentType: 'application/json',
    });
    await fetchClient.sendRequest();
    // успешно добавили
    return true;
  };
}

export { RatingService };
