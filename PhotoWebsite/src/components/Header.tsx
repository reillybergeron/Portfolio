import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Header.css'; // Import the CSS file for hover effect

const Header: React.FC = () => {
  const location = useLocation(); // Get the current location

  const getButtonClass = (path: string) => {
    return location.pathname === path ? 'header-button active' : 'header-button';
  };

  return (
    <header
      style={{
        backgroundColor: "#000000",
        color: "white",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* HOME Button */}
      <Link to="/">
        <button className={getButtonClass('/')}>
          HOME
        </button>
      </Link>

      {/* GALLERY Button */}
      <Link to="/gallery">
        <button className={getButtonClass('/gallery')}>
          GALLERY 2023
        </button>
      </Link>

      {/* VARIOUS Button */}
      <Link to="/various">
        <button className={getButtonClass('/various')}>
          VARIOUS
        </button>
      </Link>

      {/* GitHub Button */}
      <a
        href="https://github.com/reillybergeron"  // Replace with your actual GitHub profile URL
        target="_blank" // Opens the link in a new tab
        rel="noopener noreferrer" // For security reasons
        className="header-button" // Optional: Apply custom CSS class for styling
      >
        GITHUB
      </a>

      {/* CONTACT Button */}
      <Link to="/contact">
        <button className={getButtonClass('/contact')}>
          CONTACT
        </button>
      </Link>
    </header>
  );
};

export default Header;
