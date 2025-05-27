import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = ({ children, className }) => {
  return (
    <div className={`${styles.dashboardContent} ${className}`}>{children}</div>
  );
};
export default Dashboard;
