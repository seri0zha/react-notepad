import React from "react";
import Editor from "./Editor";
import {connect} from "react-redux";
import {editText, editTitle} from "../../redux/editorReducer";

let actionCreators = {
  editText,
  editTitle,
};

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

export default connect(mapStateToProps, actionCreators)(Editor);
