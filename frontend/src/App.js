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

  const handleAuth = async (selectedRole) => {
    if (!userId.trim() || !password.trim()) {
      alert("Please enter both your ID and password.");
      return;
    }

    try {
      if (authMode === "signup") {
        if (!name.trim()) {
          alert("Please enter your name to create an account.");
          return;
        }
        const data = await signupUser({
          id: userId,
          name,
          password,
          role: selectedRole,
        });
        setRole(selectedRole);
        setName(data.name);
        setUserId(data.id);
        setActiveView(selectedRole === "teacher" ? "teacher" : "student");
      } else {
        const data = await loginUser({
          id: userId,
          password,
          role: selectedRole,
        });
        setRole(selectedRole);
        setName(data.name);
        setUserId(data.id);
        setActiveView(selectedRole === "teacher" ? "teacher" : "student");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Authentication failed. Please try again.";
      alert(message);
      console.error("Auth error:", err);
    }
  };

  const handleGoogleAuth = async (selectedRole) => {
    try {
      const googleUser = await signInWithGoogle();
  
      const data = await googleAuthUser({
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        role: selectedRole,
      });
  
      setRole(selectedRole);
      setName(data?.name || googleUser?.name || "");
      setUserId(data?.id || googleUser?.id || "");
      setActiveView(selectedRole === "teacher" ? "teacher" : "student");
    } catch (err) {
      console.error("Google auth error:", err);
      const message =
        err.response?.data?.message ||
        "Google authentication failed. Please try again.";
      alert(message);
    }
  };
  

  const handleLogout = () => {
    setRole(null);
    setName("");
    setUserId("");
    setPassword("");
    setActiveView("student");
  };

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
