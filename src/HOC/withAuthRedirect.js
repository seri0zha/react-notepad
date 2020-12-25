import React from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
  isLoggedIn: state.editor.isLoggedIn
});

export let withAuthRedirect = (Component) => {
  let RedirectComponent = (props) => {
    return !props.isLoggedIn ? <Redirect to="/login"/> : <Component {...props}/>
  }
  return connect(mapStateToProps)(RedirectComponent);
};
