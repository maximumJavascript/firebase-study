import { auth } from '../firebase-config';
import { FetchStore } from '../fetchStore';
import { notifyListService } from '../notifications/NotifyList/notifyList.service';

class CreatePostService {
  #route = '/posts';

  createPost = async (postData) => {
    try {
      const fetchClient = new FetchStore({
        body: JSON.stringify({ ...postData, authorId: auth.currentUser.uid }),
        route: this.#route,
        requiredAuth: true,
        method: 'POST',
        contentType: 'application/json',
      });
      const result = await fetchClient.sendRequest();
      notifyListService.addSuccess('Пост успешно создан!');
      return result;
    } catch (e) {
      notifyListService.addError('Произошла ошибка!');
      throw new Error(e);
    }
  };
}

export const createPostService = new CreatePostService();
