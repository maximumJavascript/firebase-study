import { addDoc, collection, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { commentsListService } from '../CommentsList/commentsList.service';

class CreateCommentService {
  _collection = collection(db, 'comments');

  createComment = async (commentData) => {
    // console.log(commentData);
    try {
      const response = await fetch(`http://localhost:3001/comments`, {
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
