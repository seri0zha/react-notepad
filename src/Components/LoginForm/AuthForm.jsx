import React, {useEffect, useState} from "react";
import styles from "./LoginForm.module.css";
import Header from "../Header/Header";
import NotesListContainer from "../NotesList/NotesListContainer";
import MainContentContainer from "../MainContent/MainContentContainer";
import firebaseApp from "../../fire";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        props.toggleLoggedIn(true);
      } else {
        props.toggleLoggedIn(false);
      }
    });
  },[]);

  let handleSubmit = (e) => {
    e.preventDefault();
    props.trySignIn(email, password);
  };

  let handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  let handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  return (
    props.isLoggedIn ?
    <div className='app-wrapper'>
      <Header logOut={props.logOut}/>
      <NotesListContainer />
      <MainContentContainer />
    </div> :
    <div className={styles["login-form"]}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles["input-wrapper"]}>
          <input className={styles["input-field"]}
                 placeholder="Email"
                 onChange={handleEmailChange}
                 value={email}/>
        </div>
        <div className={styles["input-wrapper"]}>
          <input className={styles["input-field"]}
                 placeholder="Password"
                 type="password"
                 onChange={handlePasswordChange}
                 value={password}/>
        </div>
        <input type="submit" value="Login" />
      </form>
      <button onClick={() => props.trySignIn()}>
        Sign in with Google
      </button>
    </div>

  );
};

export default LoginForm;