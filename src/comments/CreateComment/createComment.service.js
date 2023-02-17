import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';

class CreateCommentService {
  _collection = collection(db, 'comments');

  createComent = (commentData) => {
    addDoc(this._collection, {});
  };
}

export const createCommentService = new CreateCommentService();
