import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { commentsListService } from '../CommentsList/commentsList.service';

class CreateCommentService {
  _collection = collection(db, 'comments');

  createComment = async (commentData) => {
    await addDoc(this._collection, {
      authorId: auth.currentUser.uid,
      date: Timestamp.fromDate(new Date()),
      ...commentData,
    });
    void (await commentsListService.getComments(commentData.postId));
  };
}

export const createCommentService = new CreateCommentService();
