import {v4 as createId} from 'uuid';
import firebaseApp, { authWithEmailAndPassword, authWithGoogle} from "../fire";

const EDIT_TEXT = "EDIT_TEXT";
const EDIT_TITLE = "EDIT_TITLE";
const CREATE_NOTE = "CREATE_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const TOGGLE_LOGGED_IN = "TOGGLE_LOGGED_IN";
const TOGGLE_USER_INFO_IS_FETCHING = "TOGGLE_USER_INFO_IS_FETCHING";
const TOGGLE_NOTES_LIST_IS_FETCHING = "TOGGLE_NOTES_LIST_IS_FETCHING";
const SET_NOTES = "SET_NOTES";
const SET_USER_ID = "SET_USER_ID";

let initialState = {
  userInfoIsFetching: false,
  notesListIsFetching: false,
  userID: null,
  errorCode: null,
  errorMessage: null,
  isLoggedIn: false,
  notes: {}
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      let newNote = {};
      newNote[createId()] = {title: "New note", text: "Hello world!"};
      return {
        ...state,
        notes: {...state.notes, ...newNote},
      }
    }
    case EDIT_TITLE: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.notes[action.id].title = action.title;
      return newState;
    }
    case EDIT_TEXT: {
      let newState = JSON.parse(JSON.stringify(state));
      newState.notes[action.id].text = action.text;
      return newState;
    }
    case TOGGLE_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }
    }
    case SET_NOTES: {
      return {
        ...state,
        notes: action.notes
      }
    }
    case SET_USER_ID: {
      return {
        ...state,
        userID: action.userID,
      }
    }

    case TOGGLE_USER_INFO_IS_FETCHING:
      return {
        ...state,
        userInfoIsFetching: action.isFetching
      }

    case TOGGLE_NOTES_LIST_IS_FETCHING:
      return {
        ...state,
        notesListIsFetching: action.isFetching,
      }
    case DELETE_NOTE: {
      let newState = JSON.parse(JSON.stringify(state));
      delete newState.notes[action.id];
      return newState;
    }
    default:
      return {...state};
  }
};

export const trySignInWithThirdParty = type => dispatch => {
  toggleUserInfoIsFetching(true);
  authWithGoogle().then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = result.credential.accessToken;
    // The signed-in user info.
    //var user = result.user;
    dispatch(setUserID(token));
    dispatch(toggleLoggedIn(true))
    toggleUserInfoIsFetching(false);
  }).catch(function (error) {
    toggleUserInfoIsFetching(false);
  })
}

export const trySignIn = (email = null, password = null) => {
  return dispatch => {
    toggleUserInfoIsFetching(true);
    if (email) {
      authWithEmailAndPassword(email, password)
        .then(function (user) {
          let token = user.credential.accessToken;
          // The signed-in user info.
          //var user = result.user;
          dispatch(setUserID(token));
          dispatch(toggleLoggedIn(true));
          toggleUserInfoIsFetching(false);
        })
        .catch(function (error) {
          toggleUserInfoIsFetching(false);
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
      });
    } else {
      authWithGoogle()
        .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        dispatch(setUserID(token));
        dispatch(toggleLoggedIn(true))
        toggleUserInfoIsFetching(false);
      }).catch(function (error) {

      })
    }
  }
};

export const logOut = () => {
  return dispatch => {
    firebaseApp.auth().signOut().then(function () {
      dispatch(toggleLoggedIn(false));
    }).catch(function (error) {
    });
  };
};
/*export const getNotes = (userId) => {
  return dispatch => {
    toggleNotesListIsFetching(true);
    database.ref(`/users/${userId}`).once('value').then(function (snapshot) {
      let notes = snapshot.val();
      debugger;
      dispatch(setNotes(notes));
      toggleNotesListIsFetching(false);
    })
  }
}*/

export const createNote = () => ({type: CREATE_NOTE});
export const editText = (noteId, newText) => ({type: EDIT_TEXT, id: noteId, text: newText});
export const setNotes = (notes) => ({type: SET_NOTES, notes});
export const setUserID = (userID) => ({type: SET_USER_ID, userID});
export const toggleUserInfoIsFetching = (isFetching) => ({type: TOGGLE_USER_INFO_IS_FETCHING, isFetching});
export const toggleNotesListIsFetching = (isFetching) => ({type: TOGGLE_NOTES_LIST_IS_FETCHING, isFetching});
export const deleteNote = (noteId) => ({type: DELETE_NOTE, id: noteId});
export const editTitle = (noteId, newTitle) => ({type: EDIT_TITLE, id: noteId, title: newTitle});
export const toggleLoggedIn = (isLoggedIn) => ({type: TOGGLE_LOGGED_IN, isLoggedIn});
export default editorReducer;