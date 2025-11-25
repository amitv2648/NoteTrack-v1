import React, { useEffect, useState } from "react";
import { getStudentNotes } from "../api/notesApi";

const StudentNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await getStudentNotes("student123"); // hardcoded for now
      setNotes(Object.entries(res)); // convert Firebase object to array
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>My Notes</h2>
      {notes.map(([id, note]) => (
        <div key={id}>
          <h3>{note.topic}</h3>
          <p>{note.description}</p>
          <p>Teacher Edited: {note.teacherEdited ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentNotes;
