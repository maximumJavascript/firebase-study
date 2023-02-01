import {postsService} from "../posts/posts.service";

class HomeService {
	posts = postsService;
}

export const homeService = new HomeService();
