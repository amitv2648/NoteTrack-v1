const BASE_URL = "http://localhost:5000/api/notes";

export const createNote = async (noteData) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  return await res.json();
};

export const getStudentNotes = async (studentId) => {
  const res = await fetch(`${BASE_URL}/student/${studentId}`);
  return await res.json();
};

export const getNoteById = async (noteId) => {
  const res = await fetch(`${BASE_URL}/note/${noteId}`);
  return await res.json();
};

export const updateNoteByTeacher = async (noteId, noteData) => {
  const res = await fetch(`${BASE_URL}/note/${noteId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  return await res.json();
};
