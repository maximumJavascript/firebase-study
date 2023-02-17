import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

class CreateUsers {
  #collection = collection(db, 'users');

  handleAddUsers = async (user) => {
    await addDoc(this.#collection, { user });
  };
}

export const createUserService = new CreateUsers();
