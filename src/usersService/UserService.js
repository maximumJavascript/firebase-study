import { makeObservable, observable } from 'mobx';
import { baseUrl } from '../constants/api';
import { auth } from '../firebase-config';
import { FetchStore } from '../fetchService';

class UserService {
  data = [];
  route = '/users';

  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  resetUserService() {}

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

  getSingleUser = async (uid, requiredMinDelay, signal) => {
    if (!uid) throw new Error('Пустой uid!');
    const fetchClient = new FetchStore({
      route: this.route,
      signal,
      params: {
        uid,
      },
    });
    this.abortController = fetchClient.abortController;
    const fetchedUser = await fetchClient.sendRequest({ requiredMinDelay });
    return fetchedUser;
  };
}

export const userService = new UserService();
