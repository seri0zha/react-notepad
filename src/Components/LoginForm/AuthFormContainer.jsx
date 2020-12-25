import AuthForm from "./AuthForm";
import {connect} from "react-redux";
import {
  logOut,
  toggleLoggedIn,
  trySignInWithEmail,
  trySignInWithThirdParty,
  trySignUpWithEmail
} from "../../redux/authReducer";

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.editor.isLoggedIn,
  };
};
const actionCreators = {
  trySignUpWithEmail,
  trySignInWithThirdParty,
  trySignInWithEmail,
  logOut,
  toggleLoggedIn,
};
export default connect(mapStateToProps, actionCreators)(AuthForm);