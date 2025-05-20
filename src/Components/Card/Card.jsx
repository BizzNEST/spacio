import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, StatusTag, children, ...props }) => {
  return (
    <button className={styles.card} {...props}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {StatusTag}
      </div>
      <div className={styles.cardContent}>{children}</div>
    </button>
  );
};

export default Card;
