import React from "react";
import "./Navbar.css";

const navbar = () => {
  return (
    <div>
      <ul className="navbar">
        <li className="nav-item">Home</li>
        <li className="nav-item">Posts</li>
        <li className="nav-item">About us</li>
        <li className="nav-item">Contact us</li>
      </ul>
    </div>
  );
};

export default navbar;
