import React from 'react';
import { userService } from '../../../usersService/UserService';
import { makeObservable, observable, runInAction, toJS } from 'mobx';
class AuthorService {
  findTheAuthor = (userList, userId) => {
    return userList.find((user) => user.userUid === userId);
  };
}

export const authorService = new AuthorService();
