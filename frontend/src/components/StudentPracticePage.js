import React, { useState } from "react";
import axios from "axios";

function StudentPracticePage() {
  const [studentId, setStudentId] = useState(""); // Replace with auth later
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const fetchQuestions = async () => {
    if (!studentId) {
      alert("Please enter your Student ID");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/questions/student/${studentId}`);
      setQuestions(res.data);
      setAnswers({});
    } catch (err) {
      console.error(err);
      alert("Error fetching questions");
    }
  };

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now we just log the answers
    console.log("Submitted answers:", answers);
    alert("Answers submitted! (Functionality to store results can be added later)");
  };

  return (
    <div className="student-practice">
      <h2>Practice Questions</h2>
      <label>
        Enter Student ID:
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button onClick={fetchQuestions}>Load Questions</button>
      </label>

      {questions.length === 0 && <p>No questions loaded yet.</p>}

      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q.id} className="question-item">
            <p>
              <strong>{index + 1}. {q.questionText}</strong> (Topic: {q.topic}, Difficulty: {q.difficulty})
            </p>
            <input
              type="text"
              placeholder="Your answer"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          </div>
        ))}
        {questions.length > 0 && <button type="submit">Submit Answers</button>}
      </form>
    </div>
  );
}

export default StudentPracticePage;
