import express from "express";
import {
  createNote,
  getStudentNotes,
  getNoteById,
  updateNoteByTeacher
} from "../controllers/notesController.js";

const router = express.Router();

router.post("/create", createNote);
router.get("/student/:studentId", getStudentNotes);
router.get("/note/:noteId", getNoteById);
router.put("/note/:noteId/update", updateNoteByTeacher);

export default router;
