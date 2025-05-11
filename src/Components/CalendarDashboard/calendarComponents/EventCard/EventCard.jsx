import React from 'react';
import styles from './EventCard.module.css';
import StatusTag from '../../../StatusTag/StatusTag';

const EventCard = ({ event, title, calendars }) => {
  const { start, end, resourceId, attendees } = event;

  // Find calendar color by resourceId
  const calendar = calendars.find((cal) => cal.id === resourceId);
  const backgroundColor = calendar?.backgroundColor || '#f0f0f0';
  const foregroundColor = calendar?.foregroundColor || '#000000';

  const numOfAttendees = attendees.length;

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
    <div
      className={styles.container}
      style={{
        backgroundColor,
        color: foregroundColor,
      }}
    >
      <h2 className={styles.eventTitle}>{title}</h2>
      <p className={styles.eventTime}>
        {startTime} - {endTime}
      </p>

      <p className={styles.attendees}>
        {numOfAttendees > 0 && (
          <>
            <i className="fa-solid fa-users"></i>
            {numOfAttendees > 1
              ? `${numOfAttendees} Attendees`
              : `${numOfAttendees} Attendee`}
          </>
        )}
      </p>

      <div className={styles.statusTagContainer}>
        {attendees.map((attendee) => (
          <StatusTag tagFormat={styles.statusTag}>{attendee}</StatusTag>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
