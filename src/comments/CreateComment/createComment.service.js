import { collection } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { baseUrl } from '../../constants/api';

class CreateCommentService {
  _collection = collection(db, 'comments');

  createComment = async (commentData) => {
    try {
      const res = await fetch(`${baseUrl}/comments/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      if (!res.ok) return await res.json();
    } catch (e) {
      throw e;
    }
  };
}

export const createCommentService = new CreateCommentService();
