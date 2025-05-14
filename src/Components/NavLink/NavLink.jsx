import React from 'react';
import styles from './NavLink.module.css';
import { NavLink as RouterNavLink } from 'react-router-dom';

function NavLink({ links = [] }) {
  return (
    <nav className={styles.navContainer}>
      {links.map((link) => (
        <RouterNavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `${link.className ?? ''} nav-link ${isActive ? 'active' : ''}`
          }
        >
          {link.icon && <span className="icon">{link.icon}</span>}
          {link.label}
        </RouterNavLink>
      ))}
    </nav>
  );
}

export default NavLink;
