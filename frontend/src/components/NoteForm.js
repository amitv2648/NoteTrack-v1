// src/components/NoteForm.js
import React, { useState } from "react";
import { createNote } from "../api/notesApi";

const NoteForm = ({ studentId = "student123", onCreated }) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await createNote({ studentId, topic, description });
      setMsg("Saved ✓");
      setTopic("");
      setDescription("");
      if (onCreated) onCreated(res.noteId);
    } catch (err) {
      console.error(err);
      setMsg("Error saving note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card note-form">
      <h3>Create note</h3>
      <form onSubmit={submit}>
        <input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />
        <div className="form-row">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save note"}
          </button>
          {msg && <span className="form-msg">{msg}</span>}
        </div>
      </form>
    </section>
  );
};

export default NoteForm;
