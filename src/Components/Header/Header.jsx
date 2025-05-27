import React, { useState } from 'react';
import styles from './Header.module.css';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Sidebar } from 'react-feather';
import { signOut } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';

function Header({ isCollapsed, setIsCollapsed }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div
          className={styles.sidebarToggleIcon}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <GoSidebarCollapse className={styles.collapseIcon} />
          ) : (
            <GoSidebarExpand className={styles.expandIcon} />
          )}
        </div>
        <h1>Salinas Center Rooms</h1>
      </div>
      <div className={styles.headerContainer}>
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
