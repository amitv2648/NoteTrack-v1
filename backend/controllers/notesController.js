import db from "../firebase.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const { studentId, topic, description } = req.body;
    if (!studentId || !topic || !description) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newNote = {
      studentId,
      topic,
      description,
      teacherEdited: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const ref = db.ref("notes").push();
    await ref.set(newNote);

    res.status(201).json({ message: "Note created successfully", noteId: ref.key });
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all notes for a student
export const getStudentNotes = async (req, res) => {
  try {
    const { studentId } = req.params;
    const snapshot = await db.ref("notes").orderByChild("studentId").equalTo(studentId).once("value");
    res.status(200).json(snapshot.val() || {});
  } catch (err) {
    console.error("Error fetching student notes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a note by ID
export const getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;
    const snapshot = await db.ref(`notes/${noteId}`).once("value");
    if (!snapshot.exists()) return res.status(404).json({ error: "Note not found" });
    res.status(200).json({ id: noteId, ...snapshot.val() });
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update note by teacher
export const updateNoteByTeacher = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { topic, description } = req.body;
    const ref = db.ref(`notes/${noteId}`);
    const snapshot = await ref.once("value");
    if (!snapshot.exists()) return res.status(404).json({ error: "Note not found" });

    await ref.update({ topic, description, teacherEdited: true, updatedAt: Date.now() });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
