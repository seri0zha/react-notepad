import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAM3JJwwVZjyXS0qLqvgIuwse1b0QusA1w",
  authDomain: "reactnotepad.firebaseapp.com",
  databaseURL: "https://reactnotepad.firebaseio.com",
  projectId: "reactnotepad",
  storageBucket: "reactnotepad.appspot.com",
  messagingSenderId: "258057213621",
  appId: "1:258057213621:web:77c67d9e70b839b90750fc"
});

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().languageCode = 'en';

export const authWithGoogle = () => {
  return firebase.auth().signInWithPopup(provider);
}

export const database = firebase.database();

export const authWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const signUpWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export default firebaseApp;