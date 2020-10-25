import React from "react";
import styles from "./NotesList.module.css";
import Note from "../Note/Note";

const NotesList = (props) => {
  let notesElements = props.notesList.map((el) => <Note noteProps={el}/>);
  return (
    <div className={styles.notesList}>
      { notesElements }
    </div>
  );
};

export default NotesList;