// src/components/UpdateNoteModal.js
import React, { useState, useEffect } from "react";

const UpdateNoteModal = ({ note, onClose, onSave }) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (note) {
      setTopic(note.topic || "");
      setDescription(note.description || "");
    }
  }, [note]);

  if (!note) return null;

  const save = () => {
    onSave(note.id, { topic, description });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit note</h3>
        <input value={topic} onChange={(e) => setTopic(e.target.value)} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
        <div className="modal-actions">
          <button onClick={save}>Save</button>
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNoteModal;
