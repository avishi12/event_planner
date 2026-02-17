import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Deshabandu</Link>
      </div>
      <div className="navbar-links">
        <Link to="/Home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/AboutUs">AboutUs</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/Events">Events</Link>
      </div>
    </nav>
  );
}

export default Navbar;