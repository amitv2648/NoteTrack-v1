// src/App.js
import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar";
import NotesPage from "./pages/NotesPage";
import TeacherNotesPage from "./pages/TeacherNotesPage";
import { ThemeContext } from "./context/ThemeContext";
import { signupUser, loginUser, googleAuthUser, signInWithGoogle } from "./api/authApi";
import "./index.css";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [role, setRole] = useState(null); // "student" | "teacher"
  const [activeView, setActiveView] = useState("student");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"

  // ... all your existing auth functions (handleAuth, handleGoogleAuth, handleLogout) ...

  if (!role) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          {/* auth UI */}
        </div>
      </div>
    );
  }

  const shellClass = `app-shell theme-${theme.name}`;

  return (
    <div className={shellClass}>
      <aside className="sidebar">
        {/* sidebar UI */}
      </aside>
      <main className="main-content">
        {activeView === "student" && <NotesPage userId={userId} />}
        {activeView === "teacher" && role === "teacher" && <TeacherNotesPage />}
      </main>
    </div>
  );
}

export default App;
