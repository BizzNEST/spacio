import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, StatusTag, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {StatusTag}
      </div>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default Card;
