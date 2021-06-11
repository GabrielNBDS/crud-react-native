import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBNR7CTfvAb-zHEUP1TNn97yD1yWaudukw",
  authDomain: "books-1e597.firebaseapp.com",
  projectId: "books-1e597",
  storageBucket: "books-1e597.appspot.com",
  messagingSenderId: "917249292111",
  appId: "1:917249292111:web:9ec1342b590b6d0873773a"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;

export default fire;

const db = fire.firestore();
export { db };