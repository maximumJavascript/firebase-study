import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { makeObservable, observable } from 'mobx';

class PostsService {
  _collection = collection(db, 'posts');
  data = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
    this.data = [];
  }

  getPosts = async () => {
    const data = await getDocs(this._collection);
    return (this.data = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })));
  };

  getSinglePost = async (id) => {
    const docRef = doc(db, 'posts', id);
    const data = await getDoc(docRef);
    return data.exists() ? data.data() : undefined;
  };
}

export const postsService = new PostsService();
