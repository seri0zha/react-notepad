import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./Note.module.css";

const Note = (props) => {
  return (
    <NavLink className={styles.link} to={"/note/" + props.id}>
      <div className={styles.note}>
        {props.noteProps.title}
        <button onClick={() => props.deleteNote(props.id)}>
          Delete note
        </button>
      </div>
    </NavLink>
  );
};

export default Note;