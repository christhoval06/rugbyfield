import firebase from 'firebase';
import 'firebase/firestore';
import { Collection, initFirestorter } from 'firestorter';

firebase.initializeApp({
  apiKey: 'AIzaSyDoj5S9IhxLE3NVU4JjU6F5p1zDSsrzxU8',
  authDomain: 'rugbypty.firebaseapp.com',
  databaseURL: 'https://rugbypty.firebaseio.com',
  projectId: 'rugbypty',
  storageBucket: 'rugbypty.appspot.com',
  messagingSenderId: '360026523690',
});

initFirestorter({ firebase });

const players = new Collection('players');

firebase.initializeApp(config);

const root = firebase.database().ref();
const todos = firebase.database().ref('todos');

const DB = {
  root,
  todos,
};

export { DB, players };
