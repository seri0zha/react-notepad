import {connect} from "react-redux";
import NotesList from "./NotesList";
import {createNoteInDatabase as createNote, deleteNoteInDatabase as deleteNote} from "../../redux/editorReducer";
import {getNotes} from "../../redux/authReducer";

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    notesList: state.editor.notes,
    userID: state.auth.userID,
    userInfoIsFetching: state.auth.userInfoIsFetching,
  };
};

const actionCreators = {
  deleteNote,
  getNotes,
  createNote
};

export default connect(mapStateToProps, actionCreators)(NotesList);