import React, { useState } from 'react';
import styles from './AvailabilityCards.module.css';
import Card from '../Card/Card';
import StatusTag from '../StatusTag/StatusTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import CreateEventForm from '../Forms/CreateEventForm';

const AvailabilityCards = ({ header, calendarList }) => {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] =
    React.useState(false);

  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const [selectedCalendarName, setSelectedCalendarName] = useState('');

  const handleClick = (calendarId, name) => {
    setSelectedCalendarId(calendarId);
    setSelectedCalendarName(name);
  };

  return (
    <div>
      <h3>{header}</h3>

      <div className={styles.roomsAvailable}>
        <Modal
          open={isCreateEventModalOpen}
          onOpenChange={setIsCreateEventModalOpen}
        >
          {calendarList.map((calendar) => (
            <Modal.Trigger key={calendar.calendarId} asChild>
              <Card
                onClick={() => handleClick(calendar.calendarId, calendar.title)}
                title={calendar.title}
                StatusTag={
                  <StatusTag
                    label={'tag'}
                    color={'success'}
                    tagFormat={styles.statusTag}
                  >
                    <FontAwesomeIcon
                      icon={faClock}
                      className={styles.statusIcon}
                    />
                    Now
                  </StatusTag>
                }
              >
                <p>Floor: {calendar.floor}</p>
                <p>Capacity: {calendar.capacity}</p>
              </Card>
            </Modal.Trigger>
          ))}

          <Modal.Content
            title={'Book a Room'}
            subtitle={'Select your prefered time and date.'}
          >
            <CreateEventForm
              calendars={calendarList}
              calendarId={selectedCalendarId}
              calendarName={selectedCalendarName}
              afterSave={() => setIsCreateEventModalOpen(false)}
            />
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};

export default AvailabilityCards;
