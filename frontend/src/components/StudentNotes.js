import React, { useEffect, useState } from "react";
import { createNote, getStudentNotes, updateNoteByTeacher } from "../api/notesApi";

const StudentNotes = ({ studentId = "student123" }) => {
  const [notes, setNotes] = useState([]);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Fetch all notes for the student
  const fetchNotes = async () => {
    try {
      const data = await getStudentNotes(studentId);
      setNotes(data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNoteId) {
        // Update note (teacher)
        await updateNoteByTeacher(editingNoteId, { topic, description });
        setMessage("Note updated successfully");
        setEditingNoteId(null);
      } else {
        // Create note (student)
        const res = await createNote({ studentId, topic, description });
        setMessage(res.message || "Note created successfully");
      }
      setTopic("");
      setDescription("");
      fetchNotes();
    } catch (err) {
      console.error(err);
      setMessage("Error saving note");
    }
  };

  // Handle clicking a note to edit
  const handleEditClick = (note) => {
    setEditingNoteId(note.id);
    setTopic(note.topic);
    setDescription(note.description);
  };

  return (
    <div className="student-notes-page">
      <h1>Student Notes</h1>

      <div className="note-form-section">
        <h2>{editingNoteId ? "Edit Note (Teacher)" : "Create Note"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit">{editingNoteId ? "Update Note" : "Save Note"}</button>
        </form>
        {message && <p>{message}</p>}
      </div>

      <div className="notes-list-section">
        <h2>All Notes</h2>
        {notes.length === 0 ? (
          <p>No notes yet</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <strong>{note.topic}</strong> - {note.description}{" "}
                {note.teacherEdited && <span>(Edited by Teacher)</span>}
                <button onClick={() => handleEditClick(note)}>Edit</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentNotes;
