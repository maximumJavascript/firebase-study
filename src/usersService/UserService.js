import { makeObservable, observable } from 'mobx';
import { baseUrl } from '../constants/api';

class UserService {
  data = [];
  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  handleAddUsers = async (user) => {
    try {
      const res = await fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error(res.statusText);
    } catch (e) {
      throw e;
    }
  };

  getUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/users`);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      return (this.data = data);
    } catch (e) {
      throw e;
    }
  };

  isUserExist = async (uid) => {
    // сначала проверку на uid? или можно оставить на сервере?
    const url = new URL(`${baseUrl}/users/userExist`);
    url.searchParams.append('uid', uid);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      return json.isUserExist;
    } catch (e) {
      throw e;
    }
  };
}

export const userService = new UserService();
