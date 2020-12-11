import React, {useEffect} from "react";
import styles from "./NotesList.module.css";
import Note from "../Note/Note";

const NotesList = (props) => {

  useEffect(() => {
    props.getNotes();
  },[]);
  let noteIDs = Object.keys(props.notesList);
  let notesElements = noteIDs.map(el => <Note key={el} id={el} noteProps={props.notesList[el]}/>);
  return (
    <div className={styles.notesList}>
      <button onClick={props.createNote} className={styles["addNote-button"]}>
        +
      </button>
      {notesElements}
    </div>
  );
};

export default NotesList;