import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = ({ title, children }) => {
  return (
    <div className={styles.dashboardContent}>
      <button className={styles.bookRoomButton}>Book a Room</button>
      {children}
    </div>
  );
};
export default Dashboard;
