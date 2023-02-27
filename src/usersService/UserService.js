import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { makeObservable, observable, runInAction, toJS } from 'mobx';

class UserService {
  _collection = collection(db, 'users');
  data = [];
  users = {};
  constructor() {
    makeObservable(this, {
      data: observable,
      users: observable,
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
