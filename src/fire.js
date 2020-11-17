import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAM3JJwwVZjyXS0qLqvgIuwse1b0QusA1w",
  authDomain: "reactnotepad.firebaseapp.com",
  databaseURL: "https://reactnotepad.firebaseio.com",
  projectId: "reactnotepad",
  storageBucket: "reactnotepad.appspot.com",
  messagingSenderId: "258057213621",
  appId: "1:258057213621:web:77c67d9e70b839b90750fc"
};
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export let getNotes = (userId) => {
  firebase.database().ref(`/users/userId-${userId}`).once('value').then(function (snapshot) {
    let notes = snapshot.val();
    return notes;
  })
};

let auth = () => {
  firebase.auth().languageCode = 'ru';
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = result.credential.accessToken;
    // The signed-in user info.
    //var user = result.user;
    alert("signed in!");
  }).catch(function(error) {
    //var errorCode = error.code;
    //var errorMessage = error.message;
    // The email of the user's account used.
    //var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    //var credential = error.credential;
    // ...
  });
}

export const database = firebase.database();
export default auth;