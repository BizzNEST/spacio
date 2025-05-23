import React, { useState } from 'react';
import styles from './AvailabilityCards.module.css';
import Card from '../Card/Card';
import StatusTag from '../StatusTag/StatusTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import CreateEventForm from '../Forms/CreateEventForm';

const AvailabilityCards = ({ header, calendarList }) => {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] =
    React.useState(false); 



    const getTagColor = (resource) => {
    const isAvailableSoon = resource.nextAvailableTimeInMinutes < 15
    const isBusySoon = resource.timeBeforeBusyInMinutes < 15 && resource.timeBeforeBusyInMinutes != 0

    if(resource.isAvailable == false){
      if(isAvailableSoon || isBusySoon){ 
        return "notice";
      }
      return "warning";  
    }  
      return "success";
    }

    const getTagLabel = (resource) => {
      const isAvailableSoon = resource.nextAvailableTimeInMinutes < 15
      const isBusySoon = resource.timeBeforeBusyInMinutes < 15 && resource.timeBeforeBusyInMinutes != 0
      if(resource.isAvailable == false){
        if(isAvailableSoon){
          return `Free in ${resource.nextAvailableTimeInMinutes + 1}m`
        // return `${resource.nextAvailableTimeInMinutes + 1}m`
        }
          if (isBusySoon){ 
            return "Busy Soon"

          }
          return "Busy"
      }  
        return "Now"
    }
    const getTagIcon = (resource => {
      const isAvailableSoon = resource.nextAvailableTimeInMinutes < 15
      const isBusySoon = resource.timeBeforeBusyInMinutes < 15 && resource.timeBeforeBusyInMinutes != 0
      if(resource.isAvailable == false){ 
        
        if(isAvailableSoon || isBusySoon){
         return faHourglassHalf
        }
         return faClock
      }
        return faCheckCircle
    })


console.log(calendarList)

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
            <Modal.Trigger key={calendar.id} asChild>
              <Card
                onClick={() => handleClick(calendar.id, calendar.title)}
                title={calendar.title}
                StatusTag={
                  <StatusTag
                    color={getTagColor (calendar) }
                    tagFormat={styles.statusTag}
                  >
                    <FontAwesomeIcon
                      icon={ getTagIcon(calendar)}
                      className={styles.statusIcon}
                    />
                  { getTagLabel (calendar)}
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
