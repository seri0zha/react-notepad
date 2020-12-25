import React from "react";
import {Route} from "react-router-dom";
import EditorContainer from "../Editor/EditorContainer";
import styles from "./MainContent.module.css";
import NotesListContainer from "../NotesList/NotesListContainer";
import Header from "../Header/Header";
import {Switch} from "react-router";

const MainContent = (props) => {
  return (
    <div className={styles["mainContent-wrapper"]}>
      <Header logOut={() => props.logOut()}/>
      <Switch>
        <Route exact path='/note/:noteId' render={(routeProps) =>
          <EditorContainer {...routeProps}/>}/>
        <Route path='/' render={() =>
          <NotesListContainer/>}/>
      </Switch>
    </div>
  )
};

export default MainContent;
