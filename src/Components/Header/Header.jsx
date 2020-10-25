import React from "react";
import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <NavLink to="/">
        Notepad
      </NavLink>
    </div>
  );
};

export default Header;