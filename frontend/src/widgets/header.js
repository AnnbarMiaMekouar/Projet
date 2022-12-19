import { NavLink } from "react-router-dom";
import React from "react";
const Header = () => {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <NavLink
          to="/"
          className="logo d-flex align-items-center text-decoration-none me-2"
        >
          <span>Dashboard</span>
        </NavLink>
        <i className="d-none bi bi-list toggle-sidebar-btn"></i>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center"></ul>
      </nav>
    </header>
  );
};

export default Header;
