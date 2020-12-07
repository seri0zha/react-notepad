import styles from "./AuthForm.module.css";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {Redirect} from "react-router";

let AuthForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return !props.isLoggedIn ?
    <div className={styles["loginForm-wrapper"]}>
      <div className={styles["loginForm"]}>
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
          <input type="submit" value="Login" className={styles.loginButton}/>
        </form>
        <button onClick={() => props.trySignIn()} className={styles.formButton}>
          Sign in with Google
        </button>
        <NavLink to="/signup">
          <button>
            Sign up
          </button>
        </NavLink>
      </div>
    </div> :
    <Redirect to="/"/>;
};

export default AuthForm;
