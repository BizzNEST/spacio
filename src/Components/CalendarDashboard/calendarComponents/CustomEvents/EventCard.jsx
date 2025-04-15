import React from 'react';
import styles from './EventCard.module.css';
const EventCard = ({ event, title }) => {
  const { start, end } = event;

  // Format the times as needed
  const startTime = start.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
  const endTime = end.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.eventTitle}>{title}</h2>
      <p className={styles.eventTime}>
        {startTime} - {endTime}
      </p>
    </div>
  );
};

export default EventCard;
