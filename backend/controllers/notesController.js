import db from "../firebase.js";

// =============== CREATE NOTE (Student) ===============
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
      updatedAt: Date.now(),
    };

    // Push note to Realtime Database
    const ref = db.ref("notes").push();
    await ref.set(newNote);

    res.status(201).json({
      message: "Note created successfully",
      noteId: ref.key,
    });
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// =============== GET ALL NOTES FOR A STUDENT ===============
export const getStudentNotes = async (req, res) => {
  try {
    const snapshot = await db.ref("notes").once("value");
    const notesData = snapshot.val();

    if (!notesData) return res.status(200).json([]);

    const notesArray = Object.entries(notesData).map(([id, note]) => ({
      noteId: id,
      ...note,
    }));

    res.status(200).json(notesArray);
  } catch (err) {
    console.error("Error fetching notes:", err); // <-- check this log
    res.status(500).json({ error: "Internal server error" });
  }
};


// =============== GET A SINGLE NOTE BY ID ===============
export const getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;

    const snapshot = await db.ref(`notes/${noteId}`).once("value");
    const note = snapshot.val();

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ id: noteId, ...note });
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// =============== UPDATE NOTE (Teacher Edits It) ===============
export const updateNote = async (req, res) => {
  console.log("Params:", req.params);
  console.log("Body:", req.body);

  try {
    const { noteId } = req.params;
    const { topic, description } = req.body;

    if (!topic && !description) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const noteRef = db.ref(`notes/${noteId}`);
    const snapshot = await noteRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Note not found" });
    }

    const updates = {};
    if (topic) updates.topic = topic;
    if (description) updates.description = description;
    updates.teacherEdited = true;
    updates.updatedAt = Date.now();

    await noteRef.update(updates);

    res.status(200).json({ message: "Note updated successfully", noteId });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    if (!noteId) {
      return res.status(400).json({ error: "Missing noteId" });
    }

    const ref = db.ref(`notes/${noteId}`);
    await ref.remove();

    res.status(200).json({ message: "Note deleted successfully", noteId });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



