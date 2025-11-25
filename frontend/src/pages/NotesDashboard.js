// src/components/NotesDashboard.js
import React, { useState, useEffect } from "react";

const NotesDashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [editData, setEditData] = useState({ topic: "", description: "" });
  const [newNote, setNewNote] = useState({ studentId: "", topic: "", description: "" });

  const API_BASE = "http://localhost:5000/api/notes";

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE + "/");
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Select note for editing
  const handleSelect = (note) => {
    setSelectedNote(note);
    setEditData({ topic: note.topic, description: note.description });
  };

  // Update note
  const handleUpdate = async () => {
    if (!selectedNote) return;
    try {
      const res = await fetch(`${API_BASE}/note/${selectedNote.noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchNotes();
      setSelectedNote(null);
      setEditData({ topic: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete note
  const handleDelete = async (noteId) => {
    try {
      const res = await fetch(`${API_BASE}/note/${noteId}/delete`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  // Create new note
  const handleCreate = async () => {
    const { studentId, topic, description } = newNote;
    if (!studentId || !topic || !description) {
      setError("All fields are required to create a note");
      return;
    }
    try {
      const res = await fetch(API_BASE + "/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });
      if (!res.ok) throw new Error("Create note failed");
      await fetchNotes();
      setNewNote({ studentId: "", topic: "", description: "" });
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading notes...</div>;
  return (
    <div>
      <h2>Notes Dashboard</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ marginBottom: "20px" }}>
        <h3>Create New Note</h3>
        <input
          type="text"
          placeholder="Student ID"
          value={newNote.studentId}
          onChange={(e) => setNewNote({ ...newNote, studentId: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Topic"
          value={newNote.topic}
          onChange={(e) => setNewNote({ ...newNote, topic: e.target.value })}
        />
        <br />
        <textarea
          placeholder="Description"
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
        />
        <br />
        <button onClick={handleCreate}>Create Note</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.noteId} style={{ marginBottom: "10px" }}>
            <strong>{note.topic}</strong>: {note.description}{" "}
            <button onClick={() => handleSelect(note)}>Edit</button>{" "}
            <button onClick={() => handleDelete(note.noteId)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedNote && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Note</h3>
          <input
            type="text"
            placeholder="Topic"
            value={editData.topic}
            onChange={(e) =>
              setEditData({ ...editData, topic: e.target.value })
            }
          />
          <br />
          <textarea
            placeholder="Description"
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />
          <br />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setSelectedNote(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default NotesDashboard;
