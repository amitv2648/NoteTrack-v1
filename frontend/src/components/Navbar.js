// src/components/Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <h1 className="brand">NoteTrack</h1>
        <nav>
          <span className="role-pill">Student</span>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
