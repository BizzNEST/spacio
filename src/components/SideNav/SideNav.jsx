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

import styles from './SideNav.module.css';

function SideNav() {
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
