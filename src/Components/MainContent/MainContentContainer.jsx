import MainContent from "./MainContent";
import {connect} from "react-redux";
import {createNote, editNote, editTitle} from "../../redux/editorReducer";


let mapDispatchToProps = (dispatch) => {
  return {
    addNote: () => {
      dispatch(createNote());
    },
  };
};

export default connect(null, mapDispatchToProps)(MainContent);