import * as functions from 'firebase-functions';
import { app, attachRoutes } from './server';

attachRoutes();

exports.app = functions.https.onRequest(app);
