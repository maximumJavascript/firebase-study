import { action, makeObservable, observable, runInAction } from 'mobx';
import { FetchStore } from '../../fetchService';
import { userService } from '../../usersService/UserService';

class CommentsListService {
  #delayTimeout;
  #delayMS = 500;
  #route = '/comments';
  postId = '';
  offset = 0;
  limit = 3;
  comments = [];

  constructor() {
    makeObservable(this, {
      comments: observable,
    });
  }

  resetCommentsList() {
    clearTimeout(this.#delayTimeout);
    this.postId = '';
    this.offset = 0;
    this.limit = 3;
    this.comments = [];
  }

  addEmptyComments() {
    const tempArr = [];
    let length = this.comments.length;
    for (let i = 0; i < this.limit; i++) {
      tempArr.push({ isLoading: true, id: length });
      length += 1;
    }
    runInAction(() => this.comments.push(...tempArr));
  }

  removeEmptyComments() {
    runInAction(
      () => (this.comments = this.comments.filter((comment) => !comment.isLoading))
    );
  }

  async waitMinDelay() {
    await new Promise(
      (res) => (this.#delayTimeout = setTimeout(() => res(), this.#delayMS))
    );
  }

  async getAuthorCommentsInfo(comments = []) {
    const copyComments = [...comments];
    const authorInfoPromises = copyComments.map((comment) =>
      userService.getSingleUser(comment.authorId)
    );
    const authorInfoResults = await Promise.all(authorInfoPromises);
    copyComments.forEach((comment, i) => {
      comment.authorInfo = authorInfoResults[i];
    });
    return copyComments;
  }

  getComments = async (postId, requiredMinDelay, cbAbort) => {
    this.postId = postId;
    this.addEmptyComments();
    const fetchClient = new FetchStore({
      route: this.#route,
      params: {
        postId,
        offset: this.offset,
        limit: this.limit,
      },
    });
    const fetchedComments = await fetchClient.sendRequest();
    fetchedComments.forEach((v) => (v.isLoading = false));
    const commentsWithAuthorInfo = await this.getAuthorCommentsInfo(fetchedComments);
    if (requiredMinDelay) await this.waitMinDelay();
    this.removeEmptyComments();
    runInAction(() => this.comments.push(...commentsWithAuthorInfo));
  };
}

export const commentsListService = new CommentsListService();
