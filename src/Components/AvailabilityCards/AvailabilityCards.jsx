import React from 'react';
import styles from './AvailabilityCards.module.css';
import Card from '../Card/Card';
import StatusTag from '../StatusTag/StatusTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const AvailabilityCards = ({ header, calendarList }) => {
  return (
    <div>
      <h3>{header}</h3>

      <div className={styles.roomsAvailable}>
        {calendarList.map((calendar) => (
          <Card
            key={calendar.calendarId}
            title={calendar.title}
            StatusTag={
              <StatusTag
                label={'tag'}
                color={'success'}
                tagFormat={styles.statusTag}
              >
                <FontAwesomeIcon icon={faClock} className={styles.statusIcon} />
                Now
              </StatusTag>
            }
          >
            <p>{calendar.floor}</p>
            <p>{calendar.capacity}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityCards;
