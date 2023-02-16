import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

class CreatePostService {
	#collection = collection(db, 'posts');

	get #authorData() {
		return {
			name: auth.currentUser.displayName,
			id: auth.currentUser.uid,
		};
	}

	handleCreatePost = async (postData) => {
		await addDoc(this.#collection, {
			...postData,
			author: this.#authorData,
		});
	};
}

export const createPostService = new CreatePostService();
