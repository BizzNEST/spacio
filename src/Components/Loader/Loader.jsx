import React from 'react';
import { BarLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = ({ label = 'Loading...', ...props }) => {
  return (
    <div className={styles.loader}>
      <h2>{label}</h2>
      <BarLoader {...props} />
    </div>
  );
};

export default Loader;
