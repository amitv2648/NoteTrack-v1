// src/App.js
import React from "react";
import Navbar from "./components/Navbar";
import NotesPage from "./pages/NotesPage";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <NotesPage />
    </>
  );
}

export default App;
