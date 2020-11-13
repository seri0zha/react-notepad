import {v4 as createId} from 'uuid';

const EDIT_TEXT = "EDIT_TEXT";
const EDIT_TITLE = "EDIT_TITLE";
const CREATE_NOTE = "CREATE_NOTE";
const DELETE_NOTE = "DELETE_NOTE";

let initialState = {
  notes: [
    {
      id: createId(),
      title: "New note",
      text: "Some text",
    },
  ]
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      let newNote = {
        id: createId(),
        title: "New note",
        text: "",
      }
      return {
        ...state,
        notes: [...state.notes, newNote],
      }
    }
    case EDIT_TITLE: {
      let newState = {
        ...state,
        notes: [...state.notes]
      };
      let index = newState.notes.findIndex(note => note.id === action.id);
      newState.notes[index].title = action.title;
      return newState;
    }

    case EDIT_TEXT: {
      let newState = {
        ...state,
        notes: [...state.notes]
      };
      let index = newState.notes.findIndex(note => note.id === action.id);
      newState.notes[index].text = action.text;
      return newState;
    }

    case DELETE_NOTE: {
      return state;
    }
    default:
      return state;
  }
};

export const createNote = () => ({type: CREATE_NOTE});
export const editText = (noteId, newText) => ({type: EDIT_TEXT, id: noteId, text: newText});
export const deleteNote = (noteId) => ({type: DELETE_NOTE, id: noteId});
export const editTitle = (noteId, newTitle) => ({type: EDIT_TITLE, id: noteId, title: newTitle});
export default editorReducer;