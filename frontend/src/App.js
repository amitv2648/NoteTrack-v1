import React from "react";
import NotesPage from "./pages/NotesPage";
import TeacherNotesPage from "./pages/TeacherNotesPage";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <NotesPage />
      {/* Uncomment for teacher view */}
      {/* <TeacherNotesPage /> */}
    </ThemeProvider>
  );
}

export default App;
