import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBorderAll,
  faRoad,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import Card from '../Card/Card';
import StatusTag from '../StatusTag/StatusTag';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './SideNav.module.css';
import { setHours, setMinutes } from 'date-fns';

function SideNav({calendars}) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [selectedRoom, setSelectedRoom] = React.useState('');
  //make it so the typing wont update if the end time is lower than the start time 
  const handleEndTimeChange = (date) => {
    if (date < startDate) {
      return;
    }
    setEndDate(date);
  };
  //Room selection handler 
  const handleRoomSelect = (e) => {
    setSelectedRoom(e.target.value);
  };
  return (
    <nav className={styles.sidenav}>
      <div className={styles.topContainer}>
        <div className={styles.logoTitle}>
          <img
            src="https://plus.unsplash.com/premium_photo-1724222166545-3bcd79fec6ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyJTIwd2l0aCUyMGJsdWUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
            alt="User Profile"
            className={styles.profileImage}
          />
          <p>Digital NEST</p>
        </div>

        <input
          className={styles.sideSearch}
          type="text"
          placeholder="Jump To.."
        ></input>

        <a className={styles.sideTabs} href="#section">
          <FontAwesomeIcon className={styles.iconGrid} icon={faBorderAll} />
          Meeting Rooms
        </a>
      </div>

      <Card
        title={'Title'}
        StatusTag={
          <StatusTag
            label={'tag'}
            color={'success'}
            tagFormat={styles.statusTag}
          >
            <FontAwesomeIcon icon={faRobot} className={styles.statusIcon} />
            Test
          </StatusTag>
        }
      >
        <p>Child 1</p>
        <p>Child 2</p>
      </Card>

      <Modal>
        <Modal.Trigger asChild>
          <Button type="gradient" className={styles.bookButton}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            Book a Room
          </Button>
        </Modal.Trigger>

        <Modal.Content
          title={'Book a Room'}
          subtitle={'Select your prefered time and date.'}
        >
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <label className={styles.eventLabel} htmlFor="eventName">
                Title
              </label>
              <input
                className={styles.eventNameInput}
                type="text"
                placeholder="Leetcode Session"
              />
            </div>

            <div className={styles.timeRangeContainer}>
              {/* Logic for Date */}
              <div className={styles.inputWrapper}>
                <label className={styles.timeLabel} htmlFor="Date">
                  Date
                </label>
                <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy"  
                className={styles.timeInput}
                shouldCloseOnSelect={true}

                />
              </div>
              {/* Logic for Start Time */}
              <div className={styles.inputWrapper}>
                <label className={styles.timeLabel} htmlFor="StartTime">
                  Start Time
                </label>
                <DatePicker
               selected={startDate}
               onChange={(date) => setStartDate(date)}
               showTimeSelect
               showTimeSelectOnly
               timeIntervals={15}
               timeCaption="Time"
              dateFormat="h:mm aa"
                className={styles.timeInput}
                />
              </div>
              {/* Logic for End Time */}
              <div className={styles.inputWrapper}>
                  <label className={styles.timeLabel}>End Time</label>
                  <DatePicker
                selected={endDate}
                onChange={handleEndTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className={styles.timeInput}
                minTime={startDate}   
                maxTime={setHours(setMinutes(new Date(), 45), 23)}
                minDate={startDate}
              />
              </div>
            </div>
            {/* Logic for Room Selection */}
            <div className={styles.inputWrapper}>
              <label className={styles.roomLabel} htmlFor="roomSelect">
                Select Room
              </label>
              <select 
              id="roomSelect"
             className={styles.roomInput}
             value={selectedRoom}
             onChange={handleRoomSelect}
             >
            <option value="" disabled>Select a room</option>
            {calendars.map((room) => (
            <option key={room.id} value={room.id}>
            {room.title}
            </option>
            ))}
            </select>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
            type="gradient"
            className={styles.bookButton}
            >
              Book
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </nav>
  );
}
export default SideNav;
