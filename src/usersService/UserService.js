import { makeObservable, observable } from 'mobx';
import { baseUrl } from '../constants/api';
import { auth } from '../firebase-config';

class UserService {
  data = [];
  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  handleAddUsers = async (user) => {
    if (!auth.currentUser) throw new Error('Not authorized');
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error(res.statusText);
  };

  getUsers = async () => {
    // пока не используется где-то
    const res = await fetch(`${baseUrl}/users`);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return (this.data = data);
  };

  isUserExist = async (uid) => {
    // сначала проверку на uid? или можно оставить на сервере?
    const res = await fetch(`${baseUrl}/users/${uid}`);
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    return json;
  };
}

export const userService = new UserService();
