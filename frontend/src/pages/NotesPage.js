// src/pages/NotesPage.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import UpdateNoteModal from "../components/UpdateNoteModal";
import { getStudentNotes, updateNoteByTeacher } from "../api/notesApi";

const NotesPage = ({ studentId = "student123" }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await getStudentNotes(studentId);
      setNotes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreated = () => {
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleSaveEdit = async (noteId, payload) => {
    try {
      await updateNoteByTeacher(noteId, payload);
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="top-row">
          <h2>Notes — Student: {studentId}</h2>
        </div>

        <div className="grid">
          <div className="col left">
            <NoteForm studentId={studentId} onCreated={handleCreated} />
          </div>

          <div className="col right">
            <section className="card">
              <h3>All Notes</h3>
              {loading ? <p>Loading…</p> : <NoteList notes={notes} onEdit={handleEdit} />}
            </section>
          </div>
        </div>

        <UpdateNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={handleSaveEdit}
        />
      </main>
    </div>
  );
};

export default NotesPage;
