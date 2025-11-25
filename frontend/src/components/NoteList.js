import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [studentId, setStudentId] = useState(""); // Replace with auth later
  const [loaded, setLoaded] = useState(false);

  const fetchNotes = async () => {
    if (!studentId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/notes/student/${studentId}`);
      setNotes(res.data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      alert("Error fetching notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [studentId]);

  return (
    <div className="note-list">
      <h2>Your Notes</h2>
      <label>
        Enter Student ID to Load Notes:
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={fetchNotes}>Load Notes</button>
      </label>

      {loaded && notes.length === 0 && <p>No notes found.</p>}

      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <h3>{note.topic}</h3>
          <p>{note.description}</p>
          {note.teacherEdited && <p><em>Edited by teacher</em></p>}
        </div>
      ))}

      <Link to="/create-note">
        <button>Create a New Note</button>
      </Link>
    </div>
  );
}

export default NoteList;
