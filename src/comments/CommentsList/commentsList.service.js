import { action, makeObservable, observable, runInAction } from 'mobx';
import { FetchStore } from '../../fetchService';
import { userService } from '../../usersService/UserService';

class CommentsListService {
  route = '/comments';
  postId = '';
  offset = 0;
  limit = 3;
  commentsEnded = false;
  isLoading = false;
  comments = [];
  signal;

  constructor() {
    makeObservable(this, {
      comments: observable,
    });
  }

  resetCommentsListService() {
    this.postId = '';
    this.offset = 0;
    this.limit = 3;
    this.abortController.abort();
    this.commentsEnded = false;
    this.isLoading = false;
    runInAction(() => {
      this.comments = [];
    });
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

  async getAuthorCommentsInfo(comments = []) {
    const copyComments = [...comments];
    const authorInfoPromises = copyComments.map((comment) =>
      userService.getSingleUser(comment.authorId, false, this.abortController.signal)
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
        offset: this.offset,
        limit: this.limit,
      },
    });
    this.abortController = fetchClient.abortController;
    const fetchedResult = await fetchClient.sendRequest({ requiredMinDelay });

    const comments = fetchedResult.comments;
    comments.forEach((v) => (v.isLoading = false));

    return { aborted: fetchClient.signal.aborted, fetchedResult, comments };
  }

  async getComments(postId, requiredMinDelay, signal) {
    this.postId = postId;
    this.isLoading = true;
    this.addEmptyComments();

    const { aborted, fetchedResult, comments } = await this.getFetchedComments(
      postId,
      requiredMinDelay,
      signal
    );

    const commentsWithAuthorInfo = await this.getAuthorCommentsInfo(comments);
    this.removeEmptyComments();
    this.offset += this.limit;
    this.isLoading = false;
    if (fetchedResult.commentsEnded) this.commentsEnded = true;

    if (!aborted) runInAction(() => this.comments.push(...commentsWithAuthorInfo));
  }
}

export const commentsListService = new CommentsListService();
