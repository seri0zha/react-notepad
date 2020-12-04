import MainContent from "./MainContent";
import {connect} from "react-redux";
import {createNote, logOut} from "../../redux/editorReducer";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";


let mapDispatchToProps = {
  addNote: createNote,
  logOut,
}

export default compose(
  connect(null, mapDispatchToProps),
  withAuthRedirect
)(MainContent);