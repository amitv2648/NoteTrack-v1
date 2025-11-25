import express from "express";
import { createNote, getStudentNotes, getNoteById, updateNote, deleteNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getStudentNotes);
router.get("/note/:noteId", getNoteById);
router.post("/", createNote);
router.put("/note/:noteId", updateNote);
router.delete("/note/:noteId/delete", deleteNote);

export default router;
