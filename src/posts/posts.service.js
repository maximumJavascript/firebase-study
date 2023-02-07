import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { makeObservable, observable } from "mobx";

class PostsService {
  _collection = collection(db, "posts");
  data = [];

  constructor() {
    makeObservable(this, {
      data: observable,
    });
    this.data = [];
  }

  getPosts = async () => {
    const data = await getDocs(this._collection);
    // console.log("data await", data);
    return (this.data = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })));
  };
}

export const postsService = new PostsService();
