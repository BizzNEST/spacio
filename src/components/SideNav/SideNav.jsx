import React from 'react';
import styles from './SideNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import { Dialog, Flex } from '@radix-ui/themes/dist/cjs/index.js';
import { writeUserData } from '../../api/events/addNewEvent';

function SideNav() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const eventData = {
      event_name: formData.get('event_name'),
      event_description: formData.get('event_description'),
      date: formData.get('date'),
      start_time: formData.get('start_time'),
      end_time: formData.get('end_time'),
    };
    writeUserData(eventData);
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

      <Modal>
        <Modal.Trigger className={styles.desktopBookRoom}>
          Book a Room
        </Modal.Trigger>
        <Modal.Content
          title={'Book a Room'}
          subtitle={'Select your prefered time and date.'}
        >
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <label className={styles.eventLable} htmlFor="eventName">
                  Event Name
                </label>
                <input
                  minLength={1}
                  name="event_name"
                  className={styles.eventNameInput}
                  type="text"
                  placeholder="Enter event name"
                />
              </div>

              <div className={styles.inputWrapper}>
                <label className={styles.eventLable} htmlFor="eventDescription">
                  Event Description
                </label>
                <input
                  name="event_description"
                  className={styles.eventDescriptionInput}
                  type="text"
                  placeholder="Enter event description"
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.dateLable} htmlFor="eventDate">
                  Select Date
                </label>
                <input name="date" className={styles.dateInput} type="date" />
              </div>
              <div className={styles.dateTimeContainer}>
                <div className={styles.inputWrapper}>
                  <label
                    className={styles.startTimeLable}
                    htmlFor="eventStartTime"
                  >
                    Start Time
                  </label>
                  <input
                    name="start_time"
                    className={styles.startTimeInput}
                    type="time"
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label className={styles.endTimeLable} htmlFor="eventEndTime">
                    End Time
                  </label>
                  <input
                    name="end_time"
                    className={styles.endTimeInput}
                    type="time"
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <button className={styles.bookButton}>Book</button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Content>
      </Modal>
    </nav>
  );
}
export default SideNav;
