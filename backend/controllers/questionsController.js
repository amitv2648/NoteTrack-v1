import db from "../firebase.js";
import { Timestamp } from "firebase-admin/firestore";

// =============== CREATE QUESTION (Teacher) ===============
export const createQuestion = async (req, res) => {
  try {
    const { teacherId, studentId, topic, difficulty, questionText, answer } = req.body;

    if (!teacherId || !studentId || !topic || !difficulty || !questionText || !answer) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newQuestion = {
      teacherId,
      studentId,
      topic,
      difficulty,
      questionText,
      answer,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await db.collection("questions").add(newQuestion);

    res.status(201).json({
      message: "Question created successfully",
      questionId: docRef.id
    });
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// =============== GET QUESTIONS FOR A STUDENT ===============
export const getQuestionsForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const questionsRef = db.collection("questions");
    const snapshot = await questionsRef.where("studentId", "==", studentId).get();

    const questions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions for student:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// =============== GET QUESTIONS FOR A TEACHER ===============
export const getQuestionsForTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const questionsRef = db.collection("questions");
    const snapshot = await questionsRef.where("teacherId", "==", teacherId).get();

    const questions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions for teacher:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
