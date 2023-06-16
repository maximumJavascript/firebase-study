import { makeObservable, observable, runInAction } from 'mobx';
import { FetchStore } from '../../fetchStore';
import { userService } from '../../usersService/UserService';
import { auth } from '../../firebase-config';

class CommentsListService {
  route = '/comments';
  postId = '';
  offset = {
    markerSec: 0,
    markerNanosec: 0,
  };
  limit = 3;
  commentsEnded = false;
  isLoading = false;
  comments = [];
  createdComments = [];
  signal;

  constructor() {
    makeObservable(this, {
      comments: observable,
    });
  }

  resetCommentsListService() {
    this.postId = '';
    this.offset = {
      markerSec: 0,
      markerNanosec: 0,
    };
    this.limit = 3;
    this.abortController?.abort();
    this.commentsEnded = false;
    this.isLoading = false;
    this.waitingCreatedComments = [];
    runInAction(() => {
      this.comments = [];
    });
  }

  addEmptyComments() {
    const tempArr = [];
    for (let i = 0; i < this.limit; i++) {
      tempArr.push({ isLoading: true, id: this.comments.length + i });
    }
    runInAction(() => this.comments.push(...tempArr));
  }

  removeEmptyComments() {
    runInAction(
      () => (this.comments = this.comments.filter((comment) => !comment.isLoading))
    );
  }

  addCreatedComment(commentData, requiredAuth = false) {
    if (requiredAuth && !auth.currentUser) throw new Error('User is not authorized!');
    const user = auth.currentUser;
    const commentObj = {
      authorInfo: {
        userPhoto: user.photoURL,
        userName: user.displayName,
      },
      ...commentData,
    };

    runInAction(() => this.comments.unshift(commentObj));
    if (this.commentsEnded) return;
    this.waitingCreatedComments.push(commentObj);
  }

  filterFetchedAndCreatedComments(fetchedComments = []) {
    if (!this.waitingCreatedComments.length) return fetchedComments;
    return fetchedComments.filter(
      ({ id }) => !this.waitingCreatedComments.find(({ id: cId }) => id === cId)
    );
  }

  async getAuthorCommentsInfo(comments = [], signal) {
    const copyComments = [...comments];
    const authorInfoPromises = copyComments.map((comment) =>
      userService.getSingleUser(comment.authorId, false, signal)
    );
    const authorInfoResults = await Promise.all(authorInfoPromises);
    copyComments.forEach((comment, i) => {
      comment.authorInfo = authorInfoResults[i];
    });
    return copyComments;
  }

  async getFetchedComments(postId, requiredMinDelay, signal) {
    const fetchClient = new FetchStore({
      route: this.route,
      signal,
      params: {
        postId,
      },
      searchParams: {
        markerSec: this.offset.markerSec,
        markerNanosec: this.offset.markerNanosec,
        limit: this.limit,
      },
    });
    this.abortController = fetchClient.abortController;
    const fetchedResult = await fetchClient.sendRequest({ requiredMinDelay });

    const comments = fetchedResult.comments;
    comments.forEach((v) => (v.isLoading = false));

    return { fetchSignal: fetchClient.signal, fetchedResult, comments };
  }

  async getComments(postId, requiredMinDelay, signal) {
    this.postId = postId;
    this.isLoading = true;
    this.addEmptyComments();

    const { fetchSignal, fetchedResult, comments } = await this.getFetchedComments(
      postId,
      requiredMinDelay,
      signal
    );

    const { offset, commentsEnded } = fetchedResult;
    const commentsWithAuthorInfo = await this.getAuthorCommentsInfo(
      comments,
      this.abortController.signal
    );
    const filteredComments = this.filterFetchedAndCreatedComments(commentsWithAuthorInfo);

    this.offset = {
      markerSec: offset.markerSec,
      markerNanosec: offset.markerNanosec,
    };
    this.removeEmptyComments();
    this.isLoading = false;
    if (commentsEnded) this.commentsEnded = true;

    if (!fetchSignal.aborted) runInAction(() => this.comments.push(...filteredComments));
  }
}

export const commentsListService = new CommentsListService();
