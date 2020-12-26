import React from "react";
import styles from "./Editor.module.css";
import {Redirect} from "react-router";

const Editor = (props) => {
  let onTextChange = (e) => {
    let newText = e.currentTarget.value;
    props.editText(props.noteId, newText);
  };

  let onTitleChange = (e) => {
    let newTitle = e.target.value;
    props.editTitle(props.noteId, newTitle);
  };

  let titleConfig = {
    type: 'text',
    placeholder: 'Title',
    className: styles.titleArea,
    value: props.noteTitle,
    maxLength: '60',
  };

  let textConfig = {
    type: 'text',
    placeholder: 'Write something...',
    className: styles.editorArea,
    value: props.noteText,
    rows: '5',
  }
  return props.noteExists ? (
    <div className={styles.noteEditor}>
      <input
        {...titleConfig}
        onChange={onTitleChange}/>
      <textarea
        {...textConfig}
        onChange={onTextChange}/>
      <button onClick={props.syncNotes}>
        Save
      </button>
    </div>
  ) : (
    <Redirect to="/" />
  )
};

export default Editor;