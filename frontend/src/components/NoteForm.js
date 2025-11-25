import React, { useState } from "react";
import { createNote } from "../api/notesApi";

const NoteForm = ({ studentId = "student123", onNoteCreated }) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteData = {
        studentId,
        topic,
        description,
      };
      const res = await createNote(noteData);
      setMessage(res.message || "Note created successfully");
      setTopic("");
      setDescription("");
      if (onNoteCreated) {
        onNoteCreated(res.noteId, noteData);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error creating note");
    }
  };

  return (
    <div className="note-form">
      <h2>Create Note</h2>
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
        <button type="submit">Save Note</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NoteForm;
