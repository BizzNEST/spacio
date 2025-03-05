import React, { useState } from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <h1>OfficeFlow</h1>
      {/* Toggle between icons based on state */}
      <FontAwesomeIcon
        icon={isMenuOpen ? faXmark : faBars}
        className={styles.mobileMenuIcon}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
    </header>
  );
}

export default Header;
