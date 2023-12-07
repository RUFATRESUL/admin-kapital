import React from "react";

const CustomTabMenu = ({ label, isActive, onClick }) => (
  <a
    className={`nav-link ${isActive ? "activeTab" : ""}`}
    onClick={onClick}
    style={{ cursor: "pointer", backgroundColor: "rgb(29 33 36 / 3%)" }}
  >
    {label}
  </a>
);

export default CustomTabMenu;
