// src/components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <h2>Dashboard</h2>
        <ul>
          <li>Notes</li>
          <li>Practice</li>
          <li>Questions</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
