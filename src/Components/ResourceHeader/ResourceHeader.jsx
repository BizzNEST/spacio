import React from 'react';
import styles from './ResourceHeader.module.css';

const ResourceHeader = ({ resource }) => {
  const { title, capacity, location } = resource;
  const formattedCapacity = capacity === 1 ? '1 seat' : `${capacity} seats`;

  return (
    <div className={styles.resourceHeader}>
      <h2 className={styles.resourceTitle}>{title}</h2>
      <p className={styles.resourceLocation}>{location}</p>
      <p className={styles.resourceCapacity}>
        <i className="fa-solid fa-users"></i>
        {formattedCapacity}
      </p>
    </div>
  );
};

export default ResourceHeader;
