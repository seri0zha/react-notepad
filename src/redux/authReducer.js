import firebaseApp, {authWithEmailAndPassword, authWithGoogle, database, signUpWithEmailAndPassword} from "../fire";
import {createNote, setNotes} from "./editorReducer";

const TOGGLE_LOGGED_IN = "TOGGLE_LOGGED_IN";
const TOGGLE_USER_INFO_IS_FETCHING = "TOGGLE_USER_INFO_IS_FETCHING";
const SET_USER_ID = "SET_USER_ID";

let initialState = {
  userID: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }
    }
    case TOGGLE_USER_INFO_IS_FETCHING:
      return {
        ...state,
        userInfoIsFetching: action.isFetching
      }
    case SET_USER_ID: {
      return {
        ...state,
        userID: action.userID,
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
};

export const setUserID = userID => ({type: SET_USER_ID, userID});
export const toggleLoggedIn = isLoggedIn => ({type: TOGGLE_LOGGED_IN, isLoggedIn});
export const logOut = () => {
  return dispatch => {
    firebaseApp.auth().signOut().then(function () {
      dispatch(toggleLoggedIn(false));
      dispatch(setNotes({}));
    }).catch(function (error) {
    });
  };
};
export const toggleInfoIsFetching = isFetching => ({type: TOGGLE_USER_INFO_IS_FETCHING, isFetching});
export const trySignInWithThirdParty = loginMethod => dispatch => {
  toggleInfoIsFetching(true);
  if (loginMethod === "GOOGLE") {
    authWithGoogle()
      .then(function (result) {
        let token = result.credential.accessToken;
        dispatch(setUserID(token));
        dispatch(toggleLoggedIn(true))
      })
      .catch(function (error) {
        alert("error");
      })
      .finally(() => {
        toggleInfoIsFetching(false);
      });
  }
}
export const trySignUpWithEmail = (email, password) => dispatch => {
  dispatch(toggleInfoIsFetching(true));
  signUpWithEmailAndPassword(email, password)
    .then(result => {
      let token = result.user.uid;
      // The signed-in user info.
      //var user = result.user;
      if (result.user.emailVerified) {
        dispatch(setUserID(token));
        dispatch(toggleLoggedIn(true))
      } else {
        alert("User has not verified the email yet.")
      }
    })
    .catch(error => {
      alert("error");
    })
    .finally(() => {
      dispatch(toggleInfoIsFetching(false));
    })
}
export const trySignInWithEmail = (email, password) => dispatch => {
  dispatch(toggleInfoIsFetching(true));
  authWithEmailAndPassword(email, password)
    .then(function (result) {
      let token = result.user.uid;
      // The signed-in user info.
      //var user = result.user;
      dispatch(setUserID(token));
      dispatch(toggleLoggedIn(true));
      dispatch(toggleInfoIsFetching(false));
    })
    .catch(function (error) {
      dispatch(toggleInfoIsFetching(false));
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
        console.log(errorMessage);
      }
      console.log(error);
    });
}
export const getNotes = () => (dispatch, getState) => {
  dispatch(toggleInfoIsFetching(true));
  database.ref(`/users/${getState().auth.userID}`).once('value').then((snapshot) => {
    let notes = snapshot.val();
    debugger;
    if (notes === null) {
      dispatch(createNote());
      notes = getState().editor.notes;
      database.ref(`/users/${getState().auth.userID}`).set(notes).then(() => {
        dispatch(toggleInfoIsFetching(false));
      });
    }
    dispatch(setNotes(notes));
    dispatch(toggleInfoIsFetching(false));
  });
}
export default authReducer;