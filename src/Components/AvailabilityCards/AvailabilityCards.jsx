import React, { useState } from 'react';
import Card from '../Card/Card';
import StatusTag from '../StatusTag/StatusTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCheckCircle,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import CreateEventForm from '../Forms/CreateEventForm';
import styles from './AvailabilityCards.module.css';

const AvailabilityCards = ({ header, calendarList }) => {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] =
    React.useState(false);

  const getTagColor = (resource) => {
    const isAvailableSoon = resource.nextAvailableTimeInMinutes < 15;

    //If the room is not available or will be busy soon
    if (resource.isAvailable == false) {
      return isAvailableSoon ? 'info' : 'warning';
    }

    //Otherwise, the room is available
    return 'success';
  };

  const getTagLabel = (resource) => {
    const isAvailableSoon = resource.nextAvailableTimeInMinutes < 15;

    //If the room is not available or will be busy soon
    if (resource.isAvailable == false) {
      //Check if the room is available soon
      if (isAvailableSoon) {
        return `Free in ${resource.nextAvailableTimeInMinutes + 1}m`;
      }

      //Otherwise, the room is busy
      return 'Busy';
    }

    return 'Now';
  };

  const getTagIcon = (resource) => {
    const isAvailableSoon = resource.nextAvailableTimeInMinutes < 15;

    if (resource.isAvailable == false) {
      return isAvailableSoon ? '' : faClock;
    }

    return faCheckCircle;
  };

  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const [selectedCalendarName, setSelectedCalendarName] = useState('');

  const handleClick = (calendarId, name) => {
    setSelectedCalendarId(calendarId);
    setSelectedCalendarName(name);
  };

  return (
    <div className={styles.availabilityListContainer}>
      <h3>
        {header} ({calendarList.length})
      </h3>

      <div className={styles.roomsAvailable}>
        <Modal
          open={isCreateEventModalOpen}
          onOpenChange={setIsCreateEventModalOpen}
        >
          {calendarList.map((calendar) => (
            <Modal.Trigger asChild key={calendar.id}>
              <Card
                onClick={() => handleClick(calendar.id, calendar.title)}
                title={calendar.title}
                StatusTag={
                  <StatusTag
                    color={getTagColor(calendar)}
                    tagFormat={styles.statusTag}
                  >
                    {(calendar.nextAvailableTimeInMinutes > 15 ||
                      calendar.isAvailable) && (
                      <FontAwesomeIcon
                        icon={getTagIcon(calendar)}
                        className={styles.statusIcon}
                      />
                    )}

                    {getTagLabel(calendar)}
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
