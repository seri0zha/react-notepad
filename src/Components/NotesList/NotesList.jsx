import React, {useEffect} from "react";
import styles from "./NotesList.module.css";
import Note from "../Note/Note";
import {Redirect} from "react-router";


const NotesList = (props) => {

  let notesElements = props.notesList.map((el) => <Note noteProps={el}/>);
  return (
    <div className={styles.notesList}>
      <div className={styles["notesList-yourNotes"]}>Your notes</div>
      <button onClick={props.createNote} className={styles["addNote-button"]}>
        +
      </button>
      {notesElements}
    </div>
  );
};

export default NotesList;