import React from 'react';
import { userService } from '../../../usersService/UserService';
import { makeObservable, observable, runInAction, toJS } from 'mobx';
class AuthorService {
  authors = [];
  constructor() {
    makeObservable(this, {
      authors: observable,
    });
  }
  getAuthor = async (uid) => {
    const author = await userService.getUser(uid);
    this.authors.push(author);
    console.log(toJS(this.authors));
    // console.log(author);
    // runInAction(() => {
    // });
    // return this.authors;
  };
  get getAuthors() {
    return this.authors;
  }
}

export const authorService = new AuthorService();
