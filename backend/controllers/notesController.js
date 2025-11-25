import db from "../firebaseConfig.js";

// CREATE a new note
export const createNote = async (req, res) => {
  try {
    const { studentId, topic, description } = req.body;

    const noteRef = db.ref("notes").push();
    const timestamp = Date.now();

    const noteData = {
      studentId,
      topic,
      description,
      createdAt: timestamp,
      updatedAt: timestamp,
      teacherEdited: false
    };

    await noteRef.set(noteData);

    res.status(201).json({ message: "Note created successfully", noteId: noteRef.key });
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET all notes for a student
export const getStudentNotes = async (req, res) => {
  try {
    const { studentId } = req.params;

    const snapshot = await db
      .ref("notes")
      .orderByChild("studentId")
      .equalTo(studentId)
      .once("value");

    res.status(200).json(snapshot.val() || {});
  } catch (error) {
    console.error("Get student notes error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;

    const snapshot = await db.ref(`notes/${noteId}`).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ id: noteId, ...snapshot.val() });
  } catch (error) {
    console.error("Get note by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE note by teacher
export const updateNoteByTeacher = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { description, topic } = req.body;

    const ref = db.ref(`notes/${noteId}`);
    const snapshot = await ref.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Note not found" });
    }

    const updates = {
      description,
      topic,
      updatedAt: Date.now(),
      teacherEdited: true
    };

    await ref.update(updates);

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
