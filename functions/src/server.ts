import * as express from 'express';
import { db } from './config';
import { FieldValue } from 'firebase-admin/firestore';
export const app = express();

export function attachRoutes() {
  app.get('/echo', (req, res) => res.status(200).send('Hey there!'));

  app.get('/aboba', (req, res) => {
    const comments = db.collection('comments');
    void comments
      .count()
      .get()
      .then((query) => {
        const count = query.data().count;
        const randomIdx = Math.floor(Math.random() * count);
        return comments.orderBy('text').startAt(randomIdx).limit(1).get();
      })
      .then((query) => {
        if (query.empty) {
          res.status(204).json({ error: true, message: 'Коментов нет' });
        } else {
          res.status(200).json(query.docs[0].data());
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: true, message: 'Internal Server Error', data: err });
      });
  });

  app.get('/users', async (req, res) => {
    try {
      const collectionRef = db.collection('users');
      const snapshot = await collectionRef.get();

      const users: any = [];
      snapshot.forEach((doc) => {
        users.push(doc.data());
      });
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/posts', async (req, res) => {
    try {
      const collectionRef = db.collection('posts');
      const snapshot = await collectionRef.get();

      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      res.send(posts);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/posts/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const collectionRef = db.collection('posts');
      const existingDocRef = collectionRef.doc(id);

      existingDocRef.get().then((result) => res.send(result.data()));
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/comment', async (req, res) => {
    try {
      await db.collection('comments').add(req.body);
      res.status(201).json(req.body);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/comments/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const collectionRef = db.collection('comments');
      const query = collectionRef.where('postId', '==', id);
      let comments: any = [];

      query.get().then((qurySnapshot) => {
        qurySnapshot.forEach((doc) => comments.push(doc.data()));
        res.send(comments);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.put('/postsT/:postId', (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.body.userId;
      const postRef = db.collection('posts').doc(postId);
      postRef.update({ viewedBy: FieldValue.arrayUnion(userId) });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  app.delete('/deletePost/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const collectionRef = db.collection('posts');
      const existingDocRef = collectionRef.doc(postId);
      existingDocRef.delete();

      res.status(201).json(req.body);
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
