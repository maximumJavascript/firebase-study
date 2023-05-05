import * as functions from 'firebase-functions';
import { app, attachRoutes } from './server';
import * as cors from 'cors';
import { baseOrigin } from './constants/api';

app.use(
  cors({
    origin: baseOrigin,
  })
);
attachRoutes();

exports.app = functions.https.onRequest(app);
