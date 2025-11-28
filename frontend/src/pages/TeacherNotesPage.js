import React, { useEffect, useState } from "react";
import { getStudentNotes, updateNoteByTeacher } from "../api/notesApi";

function TeacherNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all student notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const studentId = "all"; // Or adjust according to your backend logic
        const data = await getStudentNotes(studentId);
        setNotes(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  const handleUpdateNote = async (noteId) => {
    const updatedText = prompt("Enter updated note text:");
    if (!updatedText) return;

    try {
      const updatedNote = await updateNoteByTeacher(noteId, { text: updatedText });
      setNotes(notes.map(n => (n._id === noteId ? updatedNote : n)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading notes...</p>;

  return (
    <div>
      <h1>Teacher View</h1>
      {notes.length === 0 ? (
        <p>No notes submitted yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <strong>{note.title}</strong>: {note.text}
              <button onClick={() => handleUpdateNote(note._id)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherNotesPage;
