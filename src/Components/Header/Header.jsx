import React from "react";
import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <NavLink to="/">
        <span className={styles["header-span"]}>Notepad</span>
      </NavLink>
    </div>
  );
};

export default Header;