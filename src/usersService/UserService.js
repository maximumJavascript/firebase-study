import { makeObservable, observable } from 'mobx';
import { FetchStore } from '../fetchStore';

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
    const fetchClient = new FetchStore({
      body: JSON.stringify(user),
      route: this.route,
      method: 'POST',
      requiredAuth: true,
      contentType: 'application/json',
    });
    await fetchClient.sendRequest();
  };

  getUsers = async () => {
    // пока не используется где-то
    const fetchClient = new FetchStore({ route: this.route });
    const fetchedUsers = fetchClient.sendRequest();
    return (this.data = fetchedUsers);
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
