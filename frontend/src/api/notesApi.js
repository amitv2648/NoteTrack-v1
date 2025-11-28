const API_BASE_URL = "http://localhost:5000/api/notes";

export const createNote = async (noteData) => {
  const res = await fetch(`${API_BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

export const getStudentNotes = async (studentId) => {
  const res = await fetch(`${API_BASE_URL}/student/${studentId}`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

export const updateNoteByTeacher = async (noteId, updatedData) => {
  const res = await fetch(`${API_BASE_URL}/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
};

export const deleteNote = async (noteId) => {
  const res = await fetch(`${API_BASE_URL}/${noteId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
};
