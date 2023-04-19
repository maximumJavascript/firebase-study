import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { makeObservable, observable, runInAction } from 'mobx';

class PostsService {
  _collection = collection(db, 'posts');
  data = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
    this.data = [];
  }
  deletePostItem = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId));
    this.data = this.data.filter((post) => post.id !== postId);
  };
  getPosts = async () => {
    const data = await getDocs(this._collection);
    runInAction(() => {
      return (this.data = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })));
    });
  };

  getSinglePost = async (id) => {
    if (id === undefined) return;
    const docRef = doc(db, 'posts', id);
    const data = await getDoc(docRef);
    return data.exists() ? data.data() : undefined;
  };
}

export const postsService = new PostsService();
