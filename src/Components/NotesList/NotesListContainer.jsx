import {connect} from "react-redux";
import NotesList from "./NotesList";
import {createNote} from "../../redux/editorReducer";
import {getNotes} from "../../redux/authReducer";

let mapStateToProps = (state) => {
  return {
    notesList: state.editor.notes,
    userID: state.auth.userID,
    userInfoIsFetching: state.auth.userInfoIsFetching,
  };
};

export default connect(mapStateToProps, {createNote, getNotes})(NotesList);