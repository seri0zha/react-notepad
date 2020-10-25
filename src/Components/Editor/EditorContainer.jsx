import React from "react";
import Editor from "./Editor";
import {connect} from "react-redux";
import {editNote, editTitle} from "../../redux/editorReducer";

let noteExists = (notesList, id) => {
  return notesList.some(note => note.id === id);
}

let mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.noteId;
  if (noteExists(state.editor.notes, id)) {
    let index = state.editor.notes.findIndex(note => note.id === id);
    return {
      noteText: state.editor.notes[index].text,
      noteTitle: state.editor.notes[index].title,
      noteId: id,
      noteExists: true,
    };
  } else {
    return {
      noteExists: false,
    };
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    editText: (id, newText) => {
      dispatch(editNote(id, newText));
    },
    editTitle: (id, newTitle) => {
      dispatch(editTitle(id, newTitle));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
