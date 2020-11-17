import React from "react";
import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles["header-title"]}>
        <NavLink to="/">
          NotePad
        </NavLink>
      </div>
      <div className={styles["header-login"]}>
        <button>
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;