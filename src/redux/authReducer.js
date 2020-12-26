import firebaseApp, {authWithEmailAndPassword, authWithGoogle, database, signUpWithEmailAndPassword} from "../fire";
import {setNotes} from "./editorReducer";

const TOGGLE_LOGGED_IN = "TOGGLE_LOGGED_IN";
const TOGGLE_USER_INFO_IS_FETCHING = "TOGGLE_USER_INFO_IS_FETCHING";
const SET_USER_ID = "SET_USER_ID";
const SET_USER_INFO = "SET_USER_INFO";

let initialState = {
  user: null,
  userInfoIsFetching: false,
  userEmailIsVerified: false,
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
    case SET_USER_INFO: {
      return {
        ...state,
        user: action.user,
        userID: action.user.uid,
        userEmailIsVerified: action.user.emailVerified,
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
export const setUser = user => ({type: SET_USER_INFO, user});
export const logOut = () => {
  return dispatch => {
    firebaseApp.auth().signOut().then(function () {
      dispatch(toggleLoggedIn(false));
      dispatch(setNotes({}));
    }).catch(error => {
      alert(error.message);
    });
  };
};
export const toggleInfoIsFetching = isFetching => ({type: TOGGLE_USER_INFO_IS_FETCHING, isFetching});
export const trySignInWithThirdParty = loginMethod => dispatch => {
  dispatch(toggleInfoIsFetching(true));
  if (loginMethod === "GOOGLE") {
    authWithGoogle()
      .then(result => {
        dispatch(setUser(result.user));
        dispatch(toggleLoggedIn(true));
      })
      .catch(function (error) {
        alert("error");
      })
      .finally(() => {
        dispatch(toggleInfoIsFetching(false));
      });
  }
}
export const trySignUpWithEmail = (email, password) => dispatch => {
  dispatch(toggleInfoIsFetching(true));
  signUpWithEmailAndPassword(email, password)
    .then(result => {
      result.user.sendEmailVerification().then(() => {
        alert("Check your email to verify the account");
      });
    })
    .catch(error => {
      alert(error.message);
    })
    .finally(() => {
      dispatch(toggleInfoIsFetching(false));
    })
}
export const trySignInWithEmail = (email, password) => dispatch => {
  dispatch(toggleInfoIsFetching(true));
  authWithEmailAndPassword(email, password)
    .then(result => {
      dispatch(setUser(result.user));
      dispatch(toggleLoggedIn(true));
    })
    .catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
        console.log(errorMessage);
      }
    })
    .finally(() => {
      dispatch(toggleInfoIsFetching(false));
    });
}
export const getNotes = () => (dispatch, getState) => {
  dispatch(toggleInfoIsFetching(true));
  database.ref(`/users/${getState().auth.userID}`).once('value')
    .then((snapshot) => {
      let notes = snapshot.val() ?? {}; // if snapshot.val() is null then notes is an empty object
      dispatch(setNotes(notes));
    })
    .finally(() => {
      dispatch(toggleInfoIsFetching(false));
    });
}
export default authReducer;