import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

class CreateCommentService {
  _collection = collection(db, 'comments');

  createComment = async (commentData) => {
    await addDoc(this._collection, {
      authorId: auth.currentUser.uid,
      date: Timestamp.fromDate(new Date()),
      ...commentData,
    });
  };
}

export const createCommentService = new CreateCommentService();
