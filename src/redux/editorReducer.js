import {v4 as createId} from 'uuid';
import {database} from "../fire";
import {toggleInfoIsFetching} from "./authReducer";

const EDIT_TEXT = "EDIT_TEXT";
const EDIT_TITLE = "EDIT_TITLE";
const CREATE_NOTE = "CREATE_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const TOGGLE_LOGGED_IN = "TOGGLE_LOGGED_IN";
const TOGGLE_NOTES_LIST_IS_FETCHING = "TOGGLE_NOTES_LIST_IS_FETCHING";
const SET_NOTES = "SET_NOTES";

let initialState = {
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

export const createNoteInLocalState = () => ({type: CREATE_NOTE});
export const createNoteInDatabase = () => (dispatch, getState) => {
  dispatch(toggleInfoIsFetching(true));
  dispatch(createNoteInLocalState());
  dispatch(syncNotes());
  dispatch(toggleInfoIsFetching(false));
};

export const deleteNoteInLocalState = (noteId) => ({type: DELETE_NOTE, id: noteId});
export const deleteNoteInDatabase = noteId => (dispatch, getState) => {
  dispatch(toggleInfoIsFetching(true));
  dispatch(deleteNoteInLocalState(noteId));
  dispatch(syncNotes());
  dispatch(toggleInfoIsFetching(false));
}

export const editText = (noteId, newText) => ({type: EDIT_TEXT, id: noteId, text: newText});
export const setNotes = (notes) => ({type: SET_NOTES, notes});
export const editTitle = (noteId, newTitle) => ({type: EDIT_TITLE, id: noteId, title: newTitle});

export const syncNotes = () => (dispatch, getState) => {
  dispatch(toggleInfoIsFetching(true));
  database.ref(`/users/${getState().auth.userID}`).set(getState().editor.notes)
    .finally(()=>{
      dispatch(toggleInfoIsFetching(false));
    });
};


export default editorReducer;

