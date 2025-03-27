import React from 'react';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import Dashboard from '../Dashboard/Dashboard';
import CalendarDashboard from '../CalendarDashboard/CalendarDashboard';

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <Dashboard>
        <CalendarDashboard />
      </Dashboard>
      <SideNav />
    </div>
  );
}

export default Layout;
