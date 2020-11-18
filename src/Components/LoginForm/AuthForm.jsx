import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import NotesListContainer from "../NotesList/NotesListContainer";
import MainContentContainer from "../MainContent/MainContentContainer";
import firebaseApp from "../../fire";
import {Redirect, Route} from "react-router";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthForm = (props) => {
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        props.toggleLoggedIn(true);
      } else {
        props.toggleLoggedIn(false);
      }
    });
  },[]);
  return (
    props.isLoggedIn ?
    <div className='app-wrapper'>
      <Header logOut={props.logOut}/>
      <MainContentContainer />
    </div> :
    <div>
      <Route exact path="/login" render={() =>
        <LoginForm {...props}/>
      }/>
      <Route exact path="/signup" render={() =>
        <SignUpForm/>
      }/>
      <Route path="/">
        <Redirect to="/login"/>
      </Route>
    </div>


  );
};

export default AuthForm;