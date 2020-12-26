import styles from "./AuthForm.module.css";
import React, {useState} from "react";
import {Redirect} from "react-router";

const AuthForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userIsRegistered, setUserIsRegistered] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userIsRegistered) {
      props.trySignInWithEmail(email, password);
    } else {
      if (password === confirmPassword) {
        props.trySignUpWithEmail(email, password);
      } else {
        alert("Passwords don't match!");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
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
          {!userIsRegistered && <div className={styles["input-wrapper"]}>
            <input className={styles["input-field"]}
                   placeholder="Confirm password"
                   type="password"
                   onChange={handleConfirmPasswordChange}
                   value={confirmPassword}/>
          </div>}
          <input type="submit" value={userIsRegistered ? "Login" : "Sign up"} className={styles.loginButton}/>
        </form>
        <button onClick={() => props.trySignInWithThirdParty("GOOGLE")} className={styles.formButton}>
          Sign in with Google
        </button>
        <button onClick={() => setUserIsRegistered(prevState => !prevState)}>
          {userIsRegistered ? "Sign up" : "Login"}
        </button>
      </div>
    </div> :
    <Redirect to="/"/>;
};

export default AuthForm;
