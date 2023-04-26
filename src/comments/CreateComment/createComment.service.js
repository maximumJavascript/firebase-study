import { baseUrl } from '../../constants/api';

class CreateCommentService {
  createComment = async (commentData) => {
    try {
      const res = await fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      return json;
    } catch (e) {
      throw e;
    }
  };
}

export const createCommentService = new CreateCommentService();
