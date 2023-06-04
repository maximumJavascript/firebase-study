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

  isUserExist = async (uid) => {
    if (!uid) throw new Error('Need uid');
    const fetchClient = new FetchStore({ route: this.route, params: { uid } });
    const fetchedUserExist = await fetchClient.sendRequest();
    return fetchedUserExist;
  };
}

export const userService = new UserService();
