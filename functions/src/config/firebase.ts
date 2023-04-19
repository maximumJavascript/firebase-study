import * as admin from 'firebase-admin';
import { keys } from './firebase-keys';

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: keys.private_key.replace(/\\n/g, '\n'),
    projectId: keys.project_id,
    clientEmail: keys.client_email,
  }),
  databaseURL: `https://${keys.project_id}.firebaseio.com`,
});

const db = admin.firestore();
export { admin, db };
