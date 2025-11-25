import express from "express";
import {
  createQuestion,
  getQuestionsForStudent,
  getQuestionsForTeacher
} from "../controllers/questionsController.js";

const router = express.Router();

// Teacher creates a question
router.post("/create", createQuestion);

// Get questions for a student
router.get("/student/:studentId", getQuestionsForStudent);

// Get questions for a teacher
router.get("/teacher/:teacherId", getQuestionsForTeacher);

export default router;
