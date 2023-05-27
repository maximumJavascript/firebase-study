import * as express from 'express';
import * as cors from 'cors';
import { json } from 'express';
import { db } from './config';
import { FieldValue } from 'firebase-admin/firestore';
import { baseOrigin, isProd } from './constants/api';
import { admin } from './config';

export const app = express();

// функция на проверку авторизации
async function authenticatedRequest(req: any, res: any, next: any) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).json({ error: true, message: 'Unauthorized' });
    return;
  }
  try {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const claims = await admin.auth().verifyIdToken(idToken);
    req.user = claims;
    return next();
  } catch (error: any) {
    const statusText = 'Не удалось аутентифицировать пользователя';
    res.status(401).json(statusText);
  }
}

export function attachRoutes() {
  app.get('/echo', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://maximumjavascript.github.io');
    res.status(200).send(`${baseOrigin} 28`);
  });

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

  // app.get('/users', async (req, res) => {
  //   try {
  //     const collectionRef = db.collection('users');
  //     const snapshot = await collectionRef.get();
  //     const users = snapshot.docs.map((doc) => doc.data());
  //     res.status(200).json(users);
  //   } catch (error: any) {
  //
  //     res.status(500).json({error: true, message: 'Internal Server Error', data: error});
  //   }
  // });

  app.post('/users', authenticatedRequest, async (req, res) => {
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
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });

  app.get('/users/:uid', async (req, res) => {
    try {
      const uid = req.params.uid as string;
      const doc = await db.collection('users').doc(uid).get();
      const userData = doc.data() || null;
      res.status(200).json(userData);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
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
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
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
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });

  app.delete('/posts/:postId', authenticatedRequest, async (req, res) => {
    try {
      const postId = req.params.postId || '';
      await db.collection('posts').doc(postId).delete();
      res.sendStatus(204);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });

  app.post('/posts', authenticatedRequest, async (req, res) => {
    try {
      await db.collection('posts').add(req.body);
      res.sendStatus(201);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
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
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
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
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });

  app.put('/ratings', authenticatedRequest, async (req, res) => {
    // Проверка что это именно пользователь меняет
    // Проверка на валидность данных
    try {
      const docId = (req.body.docId || '') as string;
      const score = Number(req.body.score);
      if (score < 1 || score > 10 || !Number.isFinite(score))
        throw new Error('Invalid rating score');
      await db.collection('ratings').doc(docId).update({ score });
      res.sendStatus(200);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });

  app.post('/ratings', authenticatedRequest, async (req, res) => {
    // Проверка что это именно пользователь добавляет
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
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });

  app.post('/comments', authenticatedRequest, async (req, res) => {
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
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });

  app.get('/comments/:postId', async (req, res) => {
    try {
      const postId = req.params.postId || '';
      const collectionRef = db.collection('comments');
      const query = collectionRef.where('postId', '==', postId);
      const querySnapshot = await query.get();
      const comments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });

  app.put('/views/:postId/:userId', async (req, res) => {
    // мб проверку на валидность данных
    try {
      const postId = req.params.postId;
      const userId = req.params.userId;
      if (!postId || !userId) throw new Error('Empty params');
      const postRef = db.collection('posts').doc(postId);
      await postRef.update({ viewedBy: FieldValue.arrayUnion(userId) });
      res.sendStatus(200);
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: 'Internal Server Error', data: error });
    }
  });
}

export function configureApp() {
  if (isProd) {
    app.use(
      cors({
        origin: baseOrigin,
      })
    );
    return;
  }

  app.use(json());
  app.use(
    cors({
      origin: '*',
    })
  );
}
