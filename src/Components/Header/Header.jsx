import React from "react";
import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles["header-title"]}>
        <NavLink to="/">
          NotePad
        </NavLink>
      </div>
      <div className={styles["header-login"]}>
        <NavLink to="/login">
          <button onClick={() => props.logOut()}>
            Logout
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;