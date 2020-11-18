import React from "react";
import styles from "./Editor.module.css";
import {Redirect} from "react-router";
const Editor = (props) => {
  let id = props.noteId;
  let onTextChange = (e) => {
    let newText = e.currentTarget.value;
    props.editText(id, newText);
  };

  let onTitleChange = (e) => {
    let newTitle = e.target.value;
    props.editTitle(id, newTitle);
  };

  let titleProps = {
    type: 'text',
    placeHolder: 'Title',
    className: styles.titleArea,
    value: props.noteTitle,
    maxLength: '60',
  };

  let textareaProps = {
    type: 'text',
    placeHolder: 'Write something...',
    className: styles.editorArea,
    value: props.noteText,
    rows: '5',
  }
  return props.noteExists ? (
    <div className={styles.noteEditor}>
      <input
        {...titleProps}
        onChange={onTitleChange}/>
      <textarea
        {...textareaProps}
        onChange={onTextChange}/>
    </div>
  ) : (
    <Redirect to="/" />
  )
};

export default Editor;