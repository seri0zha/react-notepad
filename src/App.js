import './App.css';
import React from 'react';
import Header from "./Components/Header/Header";
import NotesListContainer from "./Components/NotesList/NotesListContainer";
import MainContentContainer from "./Components/MainContent/MainContentContainer";

function App() {
  return (
    <div className='app-wrapper'>
      <Header />
      <NotesListContainer />
      <MainContentContainer />
    </div>
  );
}

export default App;
