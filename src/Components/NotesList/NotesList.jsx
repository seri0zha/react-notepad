import React, {useEffect} from "react";
import styles from "./NotesList.module.css";
import Note from "../Note/Note";
import auth from "../../fire";
import firebase from "firebase";

const NotesList = (props) => {
  useEffect(() => {
    //auth();
  }, []);

  let notesElements = props.notesList.map((el) => <Note noteProps={el}/>);
  return (
    <div className={styles.notesList}>
      <span className={styles["notesList-span"]}>Your notes</span>
      <button onClick={props.createNote} className={styles["addNote-button"]}>
        +
      </button>
      { notesElements }
    </div>
  );
};

export default NotesList;