import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NoteForm() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [studentId, setStudentId] = useState(""); // You can replace with auth later
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !topic || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/notes/create", {
        studentId,
        topic,
        description,
      });

      alert("Note saved successfully!");
      setTopic("");
      setDescription("");
      navigate("/notes");
    } catch (err) {
      console.error(err);
      alert("Error saving note");
    }
  };

  return (
    <div className="note-form">
      <h2>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <label>
          Note Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
        <label>
          Note Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">Save Note</button>
      </form>
    </div>
  );
}

export default NoteForm;
