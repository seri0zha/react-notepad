import {connect} from "react-redux";
import NotesList from "./NotesList";

let mapStateToProps = (state) => {
  return {
    notesList: state.editor.notes,
  };
};


export default connect(mapStateToProps, null)(NotesList);