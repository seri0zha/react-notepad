import styles from "./LoginForm.module.css";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";

const LoginForm = (props) => {
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
  return (
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
      <NavLink to="/signup" >
        <button>
          Sign up
        </button>
      </NavLink>
    </div>
  );
}

export default LoginForm;