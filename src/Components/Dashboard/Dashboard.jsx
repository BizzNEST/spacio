import React from 'react';
import useAuth from '../../hooks/useAuth';
import styles from './Dashboard.module.css';

const Dashboard = ({ title, children }) => {
  return (
    <div className={styles.dashboardContent}>
      <button className={styles.bookRoomButton}>Book a Room</button>
      {children}
    </div>
  );
};
<button onClick={useAuth}>Log out</button>;
export default Dashboard;
