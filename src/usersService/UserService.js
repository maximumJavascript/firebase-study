import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { makeObservable, observable } from 'mobx';

class UserService {
  _collection = collection(db, 'users');
  data = [];
  constructor() {
    makeObservable(this, {
      data: observable,
    });
    this.data = [];
  }

  getUsers = async () => {
    const data = await getDocs(this._collection);
    return (this.data = data.docs.map((doc) => ({
      ...doc.data(),
    })));
  };
}

export const userService = new UserService();
