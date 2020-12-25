import Editor from "./Editor";
import {connect} from "react-redux";
import {editText, editTitle} from "../../redux/editorReducer";

let actionCreators = {
  editText,
  editTitle,
};

let noteExists = (notesList, id) => {
  return (id in notesList);
}

let mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.noteId;
  if (noteExists(state.editor.notes, id)) {
    return {
      noteText: state.editor.notes[id].text,
      noteTitle: state.editor.notes[id].title,
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
