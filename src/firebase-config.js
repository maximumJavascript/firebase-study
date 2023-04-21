import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFxH17IierM1IKLeX2dDAt88n0xSwVcFw',
  authDomain: 'study-app1-8cc56.firebaseapp.com',
  projectId: 'study-app1-8cc56',
  storageBucket: 'study-app1-8cc56.appspot.com',
  messagingSenderId: '84165532547',
  appId: '1:84165532547:web:3864737a8fb3303ce4b4b6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

// Do not call this constructor directly. Instead, use firebase.auth().
