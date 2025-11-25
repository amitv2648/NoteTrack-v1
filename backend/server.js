import express from "express";
import notesRoutes from "./routes/notes.js";// adjust path if needed

const app = express();
app.use(express.json());

// Mount the notes routes at /api/notes
app.use("/api/notes", notesRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
