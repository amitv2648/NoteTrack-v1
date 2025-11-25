import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", notesRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
