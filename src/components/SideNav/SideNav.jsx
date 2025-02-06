import React from 'react';
import styles from './SideNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';

function SideNav() {
  return (
    <nav className={styles.sidenav}>
      <div className={styles.logoTitle}>
        <div className={styles.image}></div>
        <p>Digital NEST</p>
      </div>
      <input
        className={styles.sideSearch}
        type="text"
        placeholder="Jump To.."
      ></input>
      <a className={styles.sideTabs} href="#section">
        <FontAwesomeIcon className={styles.iconGrid} icon={faBorderAll} />
        Meeting Rooms
      </a>
    </nav>
  );
}
export default SideNav;
