import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = ({ title, children }) => {
  return <div className={styles.dashboardContent}>{children}</div>;
};
export default Dashboard;
