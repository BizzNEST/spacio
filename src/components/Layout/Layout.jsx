import React from 'react';
import styles from './Layout.module.css';
import SideNav from '../SideNav/SideNav';
import Dashboard from '../Dashboard/Dashboard';
import CalendarDashboard from '../CalendarDashboard/CalendarDashboard';
import Header from '../Header/Header';

function Layout() {
  return (
    <div className={styles.layout}>
      <SideNav />
      <Dashboard>
        <Header />
        <CalendarDashboard />
      </Dashboard>
    </div>
  );
}

export default Layout;
