//Create the UI for the Resource Center & style it import React from 'react';

import React from 'react';
import styles from './ResourceHeader.module.css';

const ResourceHeader = ({ resource }) => {
  const { title, capacity } = resource;
  
  return (
    <div className={styles.resourceHeader}>
      <div className={styles.resourceTitle}>{title}</div>
      <div className={styles.resourceCapacity}>
      <i className="fa-solid fa-users"></i> {capacity} {capacity === 1 ? 'seat' : 'seats'}
      </div>
    </div>
  );
};

export default ResourceHeader;