import * as express from 'express';
import { db } from './config';
import { FieldValue } from 'firebase-admin/firestore';
export const app = express();

// тестовая функция на проверку авторизации
// function authenticatedRequest(req: any, res: any, next: any)  {
//   if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
//     res.status(403).send('Unauthorized');
//     return;
//   }
//   const idToken = req.headers.authorization.split('Bearer ')[1];
//   admin.auth().verifyIdToken(idToken)
//     .then((claims) => {
//       req.user = claims;
//       return next();
//     })
//     .catch((error) => {
//       console.error('Ошибка при проверке токена:', error);
//       res.status(401).send('Не удалось аутентифицировать пользователя');
//     });
// }

export function attachRoutes() {
  app.get('/echo', (req, res) => res.status(200).send('Hey there!'));

  app.get('/aboba', (req, res) => {
    console.log(req.headers);
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
      const users = snapshot.docs.map((doc) => doc.data());
      res.status(200).json(users);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
    }
  });

  app.post('/users', async (req, res) => {
    // Проверку на авторизацию или что-то похожее
    try {
      const user = {
        userUid: req.body.userUid || '',
        userName: req.body.userName || '',
        userPhoto: req.body.userPhoto || '',
        userEmail: req.body.userEmail || '',
      };
      await db.collection('users').doc(req.body.userUid).set(user);
      res.sendStatus(201);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
    }
  });

  app.get('/users/:uid', async (req, res) => {
    try {
      const uid = req.params.uid as string;
      const doc = await db.collection('users').doc(uid).get();
      const userData = doc.data() || null;
      res.status(200).json(userData);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
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
      res.status(200).send(posts);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
    }
  });

  app.get('/posts/:id', async (req, res) => {
    try {
      const id = req.params.id || '';
      const collectionRef = db.collection('posts');
      const foundPost = await collectionRef.doc(id).get();
      if (!foundPost.exists) throw new Error('Post not found');
      const data = foundPost.data();
      res.status(200).json(data);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
    }
  });

  app.delete('/posts/:postId', async (req, res) => {
    // Проверку на авторизацию
    try {
      const postId = req.params.postId || '';
      await db.collection('posts').doc(postId).delete();
      res.sendStatus(204);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.status(500).send(error);
    }
  });

  app.post('/posts', async (req, res) => {
    // Проверку на авторизацию
    try {
      await db.collection('posts').add(req.body);
      res.sendStatus(201);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.status(500).send(error);
    }
  });

  app.get('/ratings/:postId', async (req, res) => {
    try {
      const postId = req.params.postId || '';
      const query = db.collection('ratings').where('postId', '==', postId);
      const querySnapshot = await query.get();
      const ratings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json({ ratings });
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
    }
  });

  app.get('/ratings/:postId/:userId', async (req, res) => {
    try {
      const postId = req.params.postId || '';
      const userId = req.params.userId || '';
      const query = db
        .collection('ratings')
        .where('postId', '==', postId)
        .where('userId', '==', userId);
      const querySnapshot = await query.get();
      if (!querySnapshot.size) {
        res.statusMessage = 'Rating not found';
        res.sendStatus(404);
        return;
      }
      const doc = querySnapshot.docs[0];
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
    }
  });

  app.put('/ratings', async (req, res) => {
    // Проверка на авторизацию, или что это именно пользователь меняет
    // Проверка на валидность данных
    try {
      const docId = (req.body.docId || '') as string;
      const score = Number(req.body.score);
      if (score < 1 || score > 10 || !Number.isFinite(score))
        throw new Error('Invalid rating score');
      await db.collection('ratings').doc(docId).update({ score });
      res.sendStatus(200);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
    }
  });

  app.post('/ratings', async (req, res) => {
    // Проверка на авторизацию, или что это именно пользователь меняет
    // Проверка на валидность данных
    try {
      const postId = (req.body.postId || '') as string;
      const userId = (req.body.userId || '') as string;
      const score = Number(req.body.score);
      if (score < 1 || score > 10 || !Number.isFinite(score))
        throw new Error('Invalid rating score');
      await db.collection('ratings').add({ postId, userId, score });
      res.sendStatus(201);
    } catch (error: any) {
      res.statusMessage = error.message;
      res.sendStatus(500);
    }
  });

  app.post('/comments', async (req, res) => {
    // Проверка на авторизацию
    // Валидация данных
    // Мб какая-то ещё проверк, спам и т.п.
    try {
      const text = req.body.text as string;
      const postId = req.body.postId as string;
      const date = req.body.date as Object;
      const authorId = req.body.authorId as string;
      console.log(text, postId, date, authorId);
      const docRef = await db
        .collection('comments')
        .add({ text, postId, date, authorId });
      const doc = await docRef.get();
      res.status(201).json(doc.data());
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.get('/comments/:postId', async (req, res) => {
    try {
      const postId = req.params.postId || '';
      const collectionRef = db.collection('comments');
      const query = collectionRef.where('postId', '==', postId);
      const querySnapshot = await query.get();
      const comments = querySnapshot.docs.map((doc) => doc.data());
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.put('/views/:postId/:userId', async (req, res) => {
    // мб проверку на авторизацию
    try {
      const postId = req.params.postId || '';
      const userId = req.params.userId || '';
      const postRef = db.collection('posts').doc(postId);
      await postRef.update({ viewedBy: FieldValue.arrayUnion(userId) });
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
