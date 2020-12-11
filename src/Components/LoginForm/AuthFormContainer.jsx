import React from "react";
import AuthForm from "./AuthForm";
import {connect} from "react-redux";
import {logOut, toggleLoggedIn, trySignInWithEmail, trySignInWithThirdParty} from "../../redux/authReducer";

let mapStateToProps = (state) => {
  return {
    isLoggedIn: state.editor.isLoggedIn,
  };
};
let actionCreators = {
  trySignInWithThirdParty,
  trySignInWithEmail,
  logOut,
  toggleLoggedIn,
};
export default connect(mapStateToProps, actionCreators)(AuthForm);