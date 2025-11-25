import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import StudentPracticePage from "./components/StudentPracticePage";
import TeacherQuestionBuilder from "./components/TeacherQuestionBuilder";

function App() {
  return (
    <div className="App">
      <h1>NoteTrack</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/create-note" element={<NoteForm />} />
        <Route path="/practice" element={<StudentPracticePage />} />
        <Route path="/teacher/questions" element={<TeacherQuestionBuilder />} />
      </Routes>
    </div>
  );
}

export default App;
