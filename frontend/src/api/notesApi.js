import axios from "axios";

const BASE_URL = "http://localhost:5000/api/notes";

export const createNote = async (noteData) => {
  const response = await axios.post(`${BASE_URL}/create`, noteData);
  return response.data;
};

export const getStudentNotes = async (studentId) => {
  const response = await axios.get(`${BASE_URL}/student/${studentId}`);
  return response.data;
};

export const getNoteById = async (noteId) => {
  const response = await axios.get(`${BASE_URL}/note/${noteId}`);
  return response.data;
};

export const updateNoteByTeacher = async (noteId, updatedData) => {
  const response = await axios.put(`${BASE_URL}/note/${noteId}/update`, updatedData);
  return response.data;
};
