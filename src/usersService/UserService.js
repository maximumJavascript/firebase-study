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

  getUser = async (id) => {
    // console.log(querySnapshot);
    // ВСЕ ЮЗЕРЫ
    let user;
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().user.userUid === id) {
        user = doc.data().user;
        // console.log(doc.data().user);
      }
    });
    return user;
    // ВСЕ ЮЗЕРЫ
    // const users = [];
    // const docRef = doc(db, 'users', 'fxg8gd3wj9Flp1KEwwog');
    // const userSnapshot = await getDoc(docRef);
    // console.log(userSnapshot.exists());
    // if (userSnapshot.exists()) {
    // console.log(userSnapshot.data());
    // }
    // const q = query(collection(db, 'users'), where('userUid', '==', id));
    // testSnapShot.forEach((user) => {
    // console.log('testUser');
    // users.push({
    // id: user.id,
    // ...user.data(),
    // });
    // });
    // runInAction(() => {
    // return (this.users = { id, users });
    // });
    // const data = await getDoc(docRef);
    // console.log(data.data());
    // return data.exists() ? data.data() : undefined;
    // console.log(users);
  };
}
// querySnapshot.forEach((doc) => {
// comments.push({
// id: doc.id,
// ...doc.data(),
// });
// });
export const userService = new UserService();
