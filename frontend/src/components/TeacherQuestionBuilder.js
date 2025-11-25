import React, { useState } from "react";
import axios from "axios";

function TeacherQuestionBuilder() {
  const [teacherId, setTeacherId] = useState(""); // Replace with auth later
  const [studentId, setStudentId] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacherId || !studentId || !topic || !questionText || !answer) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/questions/create", {
        teacherId,
        studentId,
        topic,
        difficulty,
        questionText,
        answer,
      });

      alert("Question created successfully!");
      setTopic("");
      setDifficulty("medium");
      setQuestionText("");
      setAnswer("");
      setStudentId("");
    } catch (err) {
      console.error(err);
      alert("Error creating question");
    }
  };

  return (
    <div className="teacher-question-builder">
      <h2>Create Practice Question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Teacher ID:
          <input
            type="text"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          />
        </label>

        <label>
          Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>

        <label>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>

        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Question:
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          ></textarea>
        </label>

        <label>
          Answer:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>

        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}

export default TeacherQuestionBuilder;
