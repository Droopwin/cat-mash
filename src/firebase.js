import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyDzXgk-cY7vtDKBkFt-yBwzSFyP4AX-ECQ',
  authDomain: 'cat-mash-david.firebaseapp.com',
  databaseURL: 'https://cat-mash-david.firebaseio.com',
  projectId: 'cat-mash-david',
  storageBucket: 'cat-mash-david.appspot.com',
  messagingSenderId: '142993858577',
  appId: '1:142993858577:web:2cc624f33e44c9a5',
});

const db = app.firestore();

export default db;
