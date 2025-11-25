import express from "express";
import { deleteNote } from "../controllers/notesController.js";

const router = express.Router();
// src/api/notesApi.js
const API_BASE_URL = "http://localhost:5000/api/notes";

// Create a new note
export const createNote = async (noteData) => {
  const res = await fetch(`${API_BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

// Get all notes for a student (returns array)
export const getStudentNotes = async (studentId) => {
  const res = await fetch(`${API_BASE_URL}/student/${studentId}`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  const data = await res.json();
  // data is object keyed by noteId; convert to array
  if (!data) return [];
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};

// Get single note by id
export const getNoteById = async (noteId) => {
  const res = await fetch(`${API_BASE_URL}/note/${noteId}`);
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
};

// Update note (teacher)
export const updateNoteByTeacher = async (noteId, updatedData) => {
  const res = await fetch(`${API_BASE_URL}/note/${noteId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
};
router.delete("/note/:noteId/delete", deleteNote);
export default router;