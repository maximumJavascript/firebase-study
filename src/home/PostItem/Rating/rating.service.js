import { makeObservable, observable, runInAction } from 'mobx';
import { auth } from '../../../firebase-config';
import { FetchStore } from '../../../fetchStore';
import { postsService } from '../../../posts/posts.service';
import { notifyListService } from '../../../notifications/NotifyList/notifyList.service';
import { STATUS } from '../../../constants/notify';

class RatingService {
  #route = '/ratings';
  averageScore = -1;

  constructor(postId, initialScore) {
    makeObservable(this, {
      averageScore: observable,
    });

    this.postId = postId;
    if (initialScore >= 0) this.averageScore = initialScore;
  }

  changeLocalRating(score) {
    const currentPost = postsService.data.find(({ id }) => id === this.postId);
    if (!currentPost) return;
    currentPost.ratingScore = score;
  }

  getAverageScore = async (postId, signal) => {
    const ratings = await this.getRatings(postId ? postId : this.postId, signal);
    if (ratings === undefined) return;
    const sum = ratings.reduce((acc, obj) => acc + obj.score, 0);
    const score = sum / ratings.length;
    return runInAction(() => (this.averageScore = isFinite(score) ? score : 0));
  };

  getRatings = async (postId, signal) => {
    if (postId === undefined) return;
    const fetchClient = new FetchStore({
      route: this.#route,
      params: { postId: postId },
      signal,
    });
    const fetchedRatings = await fetchClient.sendRequest();
    return fetchedRatings.ratings;
  };

  getSingleRating = async (userId) => {
    const fetchClient = new FetchStore({
      route: this.#route,
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

  #changeRating = async (docId, score) => {
    try {
      const fetchClient = new FetchStore({
        body: JSON.stringify({ docId, score }),
        route: this.#route,
        method: 'PUT',
        requiredAuth: true,
        contentType: 'application/json',
      });
      await fetchClient.sendRequest();
      this.changeLocalRating(score);
      notifyListService.addNotify('Вы изменили оценку!', STATUS.SUCCESSFULLY);
    } catch (e) {
      notifyListService.addNotify('Произошла ошибка!', STATUS.ERROR);
      throw new Error(e);
    }
  };

  addRating = async (score) => {
    try {
      const userId = auth.currentUser.uid;
      const userRating = await this.getSingleRating(userId);
      if (userRating) {
        await this.#changeRating(userRating.id, score);
        // изменили
        return false;
      }

      const fetchClient = new FetchStore({
        body: JSON.stringify({ postId: this.postId, score, userId }),
        route: this.#route,
        requiredAuth: true,
        method: 'POST',
        contentType: 'application/json',
      });
      await fetchClient.sendRequest();
      this.changeLocalRating(score);

      // успешно добавили
      notifyListService.addNotify('Ваша оценка добавлена!', STATUS.SUCCESSFULLY);
      return true;
    } catch (e) {
      notifyListService.addNotify('Произошла ошибка!', STATUS.ERROR);
      throw new Error(e);
    }
  };
}

export { RatingService };
