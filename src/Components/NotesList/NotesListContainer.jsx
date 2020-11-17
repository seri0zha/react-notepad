import {connect} from "react-redux";
import NotesList from "./NotesList";
import {createNote} from "../../redux/editorReducer";

let mapStateToProps = (state) => {
  return {
    notesList: state.editor.notes,
  };
};

export default connect(mapStateToProps, {createNote})(NotesList);