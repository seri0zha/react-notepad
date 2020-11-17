import React from "react";
import styles from "./NotFound.module.css"
const NotFound = () => {
  return (
    <div className={styles["not-selected"]}>
      Select a note or create a new one
    </div>
  );
};

export default NotFound;