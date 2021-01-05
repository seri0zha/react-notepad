import styles from "./AuthForm.module.css";
import React, {useState} from "react";
import {Redirect} from "react-router";
import InputField from "./InputField/InputField";
import Button from "./Button/Button";
import AuthButtonGroup from "./ButtonGroup/AuthButtonGroup";


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
        <div className={styles["input-element__wrapper"]}>
          <AuthButtonGroup userIsRegistered={userIsRegistered}
                           setUserIsRegistered={setUserIsRegistered}/>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles["input-element__wrapper"]}>
            <InputField onChange={handleEmailChange}
                        value={email}
                        label='Email'
                        id='email-field'/>
          </div>
          <div className={styles["input-element__wrapper"]}>
            <InputField onChange={handlePasswordChange}
                        value={password}
                        label='Password'
                        type='password'
                        id='password-field'/>
          </div>
          {!userIsRegistered && <div className={styles["input-element__wrapper"]}>
            <InputField onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                        label='Confirm password'
                        type='password'
                        id='confirm-password-field'/>
          </div>}
          <div className={styles["input-element__wrapper"]}>
            <Button onClick={() => {}} type='submit' variant='outlined'
                    text={userIsRegistered ? "Log in" : "Sign up"}/>
          </div>
        </form>
        { userIsRegistered &&
          <div>
            Forgot password? Sorry, we can't help you.
          </div>
        }
      </div>
      <div className={styles["loginForm"]}>
        <div className={styles["input-element__wrapper"]}>
          <Button onClick={() => props.trySignInWithThirdParty("GOOGLE")} variant='outlined'
                  text='Log in with Google'/>
        </div>
        <div className={styles["input-element__wrapper"]}>
          <Button onClick={() => {}} variant='outlined'
                  text='Log in with GitHub'/>
        </div>
      </div>
    </div> :
    <Redirect to="/"/>;
};

export default AuthForm;
