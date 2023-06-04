import { baseUrl } from '../../constants/api';
import { auth } from '../../firebase-config';

class CreateCommentService {
  createComment = async (commentData) => {
    if (!auth.currentUser) throw new Error('Not authorized');
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(`${baseUrl}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(commentData),
    });
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    return json;
  };
}

export const createCommentService = new CreateCommentService();
