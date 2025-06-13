import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
 
        <NavLink to="/" className="navbar-logo">
          Vortex75
        </NavLink>

        {/* Menu mobile (hamburger) */}
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        {/* Menu principal */}
        <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink 
              to="/admin/posts" 
              className="nav-links"
              activeClassName="active-link"
              onClick={toggleMobileMenu}
            >
              Actualités
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/tutorials" 
              className="nav-links"
              activeClassName="active-link"
              onClick={toggleMobileMenu}
            >
              Tutoriels
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/products" 
              className="nav-links"
              activeClassName="active-link"
              onClick={toggleMobileMenu}
            >
              Produits
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/auteurs" 
              className="nav-links"
              activeClassName="active-link"
              onClick={toggleMobileMenu}
            >
              Auteurs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;