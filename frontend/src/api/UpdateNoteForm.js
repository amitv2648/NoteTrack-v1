import React, { useState } from "react";
import { updateNoteByTeacher } from "../api/notesApi";

const UpdateNoteForm = ({ noteId, existingTopic, existingDescription }) => {
  const [topic, setTopic] = useState(existingTopic);
  const [description, setDescription] = useState(existingDescription);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { topic, description };
      const res = await updateNoteByTeacher(noteId, updatedData);
      setMessage(res.message);
    } catch (err) {
      console.error(err);
      setMessage("Error updating note");
    }
  };

  return (
    <div>
      <h2>Update Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Update Note</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateNoteForm;
