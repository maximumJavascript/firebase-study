import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

class CreateUsers {
  #collection = collection(db, 'users');

  handleAddUsers = async (user) => {
    // await addDoc(this.#collection, { user });
    await setDoc(doc(db, 'users', user.uid), {
      userUid: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email,
    });
  };
}

export const createUserService = new CreateUsers();
