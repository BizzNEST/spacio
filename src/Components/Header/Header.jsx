import React, { useState } from 'react';
import styles from './Header.module.css';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Sidebar } from 'react-feather';
import { signOut } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <button className={styles.menuButton}>
          <Sidebar color="#6E6E73" aria-label="Toggle Sidebar" />
        </button>
        <h1>Salinas Center Rooms</h1>
      </div>
      <div className={styles.headerContainer}>
        <div style={{ position: 'relative' }}>
          <MagnifyingGlassIcon className={styles.searchIcon} />
          <input type="text" placeholder="Search" className={styles.search} />
        </div>
        <Button
          variant={'outline'}
          className={styles.logoutButton}
          onClick={onLogout}
        >
          Log out
        </Button>
      </div>
    </header>
  );
}

export default Header;

{
  /* <FontAwesomeIcon
  icon={isMenuOpen ? faXmark : faBars}
  className={styles.mobileMenuIcon}
  onClick={() => setIsMenuOpen(!isMenuOpen)}
/>; */
}
