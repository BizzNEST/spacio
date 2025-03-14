import React, { useState } from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import  useAuth  from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


function Header() {
  const {handleSignOut} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
   // Pass navigate to handleSignOut
   const onLogout = () => {
    handleSignOut(navigate);
  };


  return (

    <header className={styles.header}>
      <h1>OfficeFlow</h1>
      {/* Toggle between icons based on state */}
      <FontAwesomeIcon
        icon={isMenuOpen ? faXmark : faBars}
        className={styles.mobileMenuIcon}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      <button onClick={onLogout}>Log out</button>
    </header>
  );
}
export default Header;
