import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
} from 'firebase/firestore';
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
  handleAddUsers = async (user) => {
    await setDoc(doc(db, 'users', user.uid), {
      userUid: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email,
    });
  };
  getUsers = async () => {
    const data = await getDocs(this._collection);
    return (this.data = data.docs.map((doc) => ({
      ...doc.data(),
    })));
  };
  isUserExist = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const data = await getDoc(docRef);
    return data.exists() ? data.data() : false;
  };
}
export const userService = new UserService();
