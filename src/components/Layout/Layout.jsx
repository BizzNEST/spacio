import React from 'react';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import { Outlet } from 'react-router-dom';
import Dashboard from '../../Dashboard/Dashboard';
import Navbar from '../Navbar/Navbar';


function Layout({ children }) {
  return <div className={styles.layout}>
    <Header /> 
    <Dashboard> 
      <Navbar />
     </Dashboard> 
    <SideNav />

  </div>;
}

export default Layout;
