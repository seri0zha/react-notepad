import React from "react";
import {Route} from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import EditorContainer from "../Editor/EditorContainer";
import styles from "./MainContent.module.css";

const MainContent = (props) => {
  return (
    <div className={styles.mainContent}>
      <Route exact path='/note/:noteId' render={(routeProps) =>
        <EditorContainer {...routeProps}/>}/>
      <Route exact path='/' render={() =>
        <NotFound />}/>
      <button onClick={props.addNote} className={styles["addNote-button"]}>
        Create a new note
      </button>
    </div>
  )
};

export default MainContent;
