import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { makeObservable, observable } from 'mobx';
import { baseUrl } from '../constants/api';

class UserService {
  _collection = collection(db, 'users');
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
      if (res.status !== 201) throw new Error('User not created');
    } catch (e) {
      throw e;
    }
  };

  getUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/users`);
      if (res.status !== 200) throw new Error('Error while retrieving users');
      const data = await res.json();
      return (this.data = data);
    } catch (e) {
      throw e;
    }
  };

  isUserExist = async (uid) => {
    // сначала проверку на uid? или можно оставить на сервере?
    const url = new URL(`${baseUrl}/user`);
    url.searchParams.append('uid', uid);
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json.isUserExist;
    } catch (e) {
      throw e;
    }
  };
}

export const userService = new UserService();
