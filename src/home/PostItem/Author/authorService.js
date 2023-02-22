import { toJS } from 'mobx';
import React from 'react';
import { userService } from '../../../usersService/UserService';

class AuthorService {
  getUser = (uid) => {
    const userList = userService.data;
    return userList.find((user) => (user.user.userUid === uid ? user : undefined));
  };
}

export const authorService = new AuthorService();
