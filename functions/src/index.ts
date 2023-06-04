import * as functions from 'firebase-functions';
import { app, attachRoutes } from './server';
import { configureApp } from './server';

configureApp();
attachRoutes();

exports.app = functions.https.onRequest(app);
