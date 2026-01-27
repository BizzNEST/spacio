import { useState } from 'react';
import styles from './Header.module.css';
import { signOut } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useAuth } from '../../contexts/authContext';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import ThemeProvider, { useTheme } from '../../contexts/themeContext';

function Header({ isCollapsed, setIsCollapsed, centerName }) {
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useAuth();
  const {theme, setTheme} = useTheme()
  console.log(theme);
  const onLogout = () => {
    signOut();
    setIsUserLoggedIn(false);
    navigate('/');
  };
  root.setAttribute('data-theme', theme);
  const darkMode = () => {
      const root = document.documentElement;
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
  }

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
        <h1>{centerName} Rooms</h1>
      </div>
      <div className={styles.headerContainer}>
        <Button
          variant={'outline'}
          className={styles.logoutButton}
          onClick={darkMode}
        >
          Dark Mode
        </Button>
        
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
