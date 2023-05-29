import { action, makeObservable, observable, runInAction } from 'mobx';
import { FetchStore } from '../../fetchService';
import { userService } from '../../usersService/UserService';

class CommentsListService {
  #route = '/comments';
  postId = '';
  offset = 0;
  limit = 3;
  comments = [];
  signal;

  constructor() {
    makeObservable(this, {
      comments: observable,
    });
  }

  resetCommentsList() {
    this.postId = '';
    this.offset = 0;
    this.limit = 3;
    this.abortController.abort();
    runInAction(() => {
      this.comments = [];
    });
    console.log(this.comments);
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
    this.abortController = fetchClient.abortController;
    const fetchedComments = await fetchClient.sendRequest({ requiredMinDelay });
    fetchedComments.forEach((v) => (v.isLoading = false));
    const commentsWithAuthorInfo = await this.getAuthorCommentsInfo(fetchedComments);
    this.removeEmptyComments();
    runInAction(() => this.comments.push(...commentsWithAuthorInfo));
  };
}

export const commentsListService = new CommentsListService();
