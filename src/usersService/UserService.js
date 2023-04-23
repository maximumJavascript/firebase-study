import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { makeObservable, observable } from 'mobx';
import { baseUrl } from '../constants/api';

class UserService {
  _collection = collection(db, 'users');
  data = [];
  users = {};
  constructor() {
    makeObservable(this, {
      data: observable,
      users: observable,
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
    const data = await getDocs(this._collection);
    return (this.data = data.docs.map((doc) => ({
      ...doc.data(),
    })));
  };

  isUserExist = async (uid) => {
    if (uid === undefined) return;
    const docRef = doc(db, 'users', uid);
    const data = await getDoc(docRef);
    return data.exists() ? data.data() : false;
  };
}

export const userService = new UserService();
