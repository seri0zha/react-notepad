import React from "react";
import AuthForm from "./AuthForm";
import {logOut, toggleLoggedIn, trySignIn} from "../../redux/editorReducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
  return {
    isLoggedIn: state.editor.isLoggedIn,
  };
};
let actionCreators = {
  trySignIn,
  logOut,
  toggleLoggedIn,
};
export default connect(mapStateToProps, actionCreators)(AuthForm);