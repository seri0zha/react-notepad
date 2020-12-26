import React, {useEffect} from "react";
import styles from "./NotesList.module.css";
import Note from "../Note/Note";

const NotesList = (props) => {
  useEffect(() => {
    props.getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createNote = () => {
    if (props.user.emailVerified)
      props.createNote();
    else alert("You must verify your email!");
  }

  const noteIDs = Object.keys(props.notesList);
  const notesElements = noteIDs.map(el => <Note deleteNote={props.deleteNote} key={el} id={el} noteProps={props.notesList[el]}/>);
  return (
    <div className={styles.notesList}>
      <button onClick={createNote} className={styles["addNote-button"]}>
        +
      </button>
      {notesElements}
    </div>
  );
};

export default NotesList;