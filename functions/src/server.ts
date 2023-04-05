import * as express from 'express';
import { db } from './config';

export const app = express();

export function attachRoutes() {
  app.get('/echo', (req, res) => res.status(200).send('Hey there!'));

  app.get('/aboba', (req, res) => {
    const comments = db.collection('comments');

    void comments.count().get()
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
      }).catch((err) => {
        res.status(500).json({ error: true, message: 'Internal Server Error', data: err });
      });
  });
}
