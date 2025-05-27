import React from 'react';
import styles from './Card.module.css';

const Card = React.forwardRef(
  ({ title, StatusTag, children, ...props }, ref) => {
    return (
      <button ref={ref} className={styles.card} {...props}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {StatusTag}
        </div>
        <div className={styles.cardContent}>{children}</div>
      </button>
    );
  }
);

export default Card;
