// src/components/NoteCard.js
import React from "react";

const NoteCard = ({ note, onEdit }) => {
  return (
    <article className="note-card">
      <div className="note-card-body">
        <h4>{note.topic}</h4>
        <p className="muted">{note.description}</p>
        <small className="muted">
          {note.teacherEdited ? "Edited by teacher" : "Student draft"} •{" "}
          {new Date(note.updatedAt).toLocaleString()}
        </small>
      </div>
      <div className="note-card-actions">
        <button onClick={() => onEdit(note)}>Edit</button>
      </div>
    </article>
  );
};

export default NoteCard;
