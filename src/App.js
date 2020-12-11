import React, {useEffect} from "react";
import './App.css';
import MainContentContainer from "./Components/MainContent/MainContentContainer";
import {Route, Switch} from "react-router";
import AuthFormContainer from "./Components/LoginForm/AuthFormContainer";
import {connect} from "react-redux";
import firebaseApp from "./fire";
import {setUserID, toggleLoggedIn} from "./redux/authReducer";

let App = (props) => {
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        props.toggleLoggedIn(true);
        props.setUserID(user.uid);
        console.log("logged in");
      } else {
        props.toggleLoggedIn(false);
        console.log("logged out");
      }
    });
  },[]);
  return (
    <div className="app-wrapper">
      <Switch>
        <Route exact path="/login" render={() =>
          <AuthFormContainer />
        }/>
        <Route path="/" render={() =>
          <MainContentContainer />
        }/>
      </Switch>
    </div>
  );
}

let actionCreators = {
  toggleLoggedIn,
  setUserID,
}

export default connect(null, actionCreators)(App);
