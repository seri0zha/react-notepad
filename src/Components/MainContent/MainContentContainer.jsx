import MainContent from "./MainContent";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {logOut} from "../../redux/authReducer";

const mapDispatchToProps = {
  logOut,
};

export default compose(
  connect(null, mapDispatchToProps),
  withAuthRedirect
)(MainContent);