import React, { useState, useEffect } from "react";
import { getStudentNotes, createNote, deleteNote } from "../api/notesApi";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getStudentNotes("studentId"); // replace with actual ID
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!newNote) return;
    const created = await createNote({ title: "Untitled", text: newNote });
    setNotes([...notes, created]);
    setNewNote("");
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter(n => n._id !== id));
  };

  return (
    <div>
      <h1>Student Notes</h1>
      <input 
        type="text" 
        value={newNote} 
        onChange={e => setNewNote(e.target.value)} 
        placeholder="Write a note..." 
      />
      <button onClick={handleAddNote}>Add</button>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {note.text}
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesPage;
