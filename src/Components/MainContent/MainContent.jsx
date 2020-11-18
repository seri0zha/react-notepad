import React from "react";
import {Route} from "react-router-dom";
import EditorContainer from "../Editor/EditorContainer";
import styles from "./MainContent.module.css";
import NotesListContainer from "../NotesList/NotesListContainer";
import {Redirect} from "react-router";

const MainContent = (props) => {
  return (
    <div className={styles.mainContent}>
      <Redirect to="/"/>
      <Route exact path='/note/:noteId' render={(routeProps) =>
        <EditorContainer {...routeProps}/>}/>
      <Route exact path='/' render={() =>
        <NotesListContainer />}/>
    </div>
  )
};

export default MainContent;
