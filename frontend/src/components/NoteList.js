// src/components/NoteList.js
import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ notes, onEdit }) => {
  if (!notes || notes.length === 0) {
    return <div className="card">No notes yet.</div>;
  }

  return (
    <div className="note-list">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default NoteList;
