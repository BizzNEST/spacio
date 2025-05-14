import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import Modal from '../Modal/Modal';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

import Card from '../Card/Card';
import StatusTag from '../StatusTag/StatusTag';

import styles from './SideNav.module.css';
import { useGetAvailability } from '../../api/availability/useGetAvailability';
import { format } from 'date-fns';
import AvailabilityCards from '../AvailabilityCards/AvailabilityCards';

function SideNav({ calendars }) {
  const { data: availabilities, isLoading: isLoadingCalendars } =
    useGetAvailability(calendars);

  const availableNow = availabilities.filter(
    (calendar) => Array.isArray(calendar.busy) && calendar.busy.length === 0
  );

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

      <AvailabilityCards calendarList={availableNow} />

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
              <label className={styles.eventLable} htmlFor="eventName">
                Event Name
              </label>
              <input
                className={styles.eventNameInput}
                type="text"
                placeholder="Enter event name"
              />
            </div>

            <div className={styles.dateTimeContainer}>
              <div className={styles.inputWrapper}>
                <label className={styles.dateLable} htmlFor="eventDate">
                  Select Date
                </label>
                <input className={styles.dateInput} type="date" />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.timeLable} htmlFor="eventTime">
                  Select Time
                </label>
                <input className={styles.timeInput} type="time" />
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </nav>
  );
}
export default SideNav;
