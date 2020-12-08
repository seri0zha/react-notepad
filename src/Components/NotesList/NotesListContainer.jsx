import {connect} from "react-redux";
import NotesList from "./NotesList";
import {createNote, getNotes} from "../../redux/editorReducer";

let mapStateToProps = (state) => {
  return {
    notesList: state.editor.notes,
    userID: state.editor.userID,
    userInfoIsFetching: state.editor.userInfoIsFetching,
  };
};

export default connect(mapStateToProps, {createNote, getNotes})(NotesList);