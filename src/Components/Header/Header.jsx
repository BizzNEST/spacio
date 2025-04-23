import React, { useState } from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';


function Header() {
  const { handleSignOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    handleSignOut();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <h1>OfficeFlow</h1>
      <FontAwesomeIcon
        icon={isMenuOpen ? faXmark : faBars}
        className={styles.mobileMenuIcon}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

{/* Outline */}
      <div className={styles.rightSection}>
        <Button 
          onClick={onLogout}
          type="outline"
        >
          Log out
        </Button>
      </div>


    </header>
  );
}

export default Header;
