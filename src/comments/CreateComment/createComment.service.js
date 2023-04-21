import { collection } from 'firebase/firestore';
import { db } from '../../firebase-config';

class CreateCommentService {
  _collection = collection(db, 'comments');

  createComment = async (commentData) => {
    try {
      const response = await fetch(`http://localhost:3001/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      return await response.json();
    } catch (err) {
      throw new Error('нихуя не вышло');
    }
  };
}

export const createCommentService = new CreateCommentService();
