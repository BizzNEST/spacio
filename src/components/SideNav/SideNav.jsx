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
import CreateEventForm from '../Forms/CreateEventForm';
import logo from '../../assets/placeholderLogo.svg';

function SideNav({ calendars, isCollapsed, className }) {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] =
    React.useState(false);

  return (
    <nav className={`${className} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.topContainer}>
        <div className={styles.logoTitle}>
          <img
            src={logo}
            alt="Placeholder Logo"
            className={
              isCollapsed ? styles.logoCollapsed : styles.placeholderLogo
            }
          />
          {!isCollapsed && <p>spacio</p>}
        </div>

        {!isCollapsed && (
          <input
            className={styles.sideSearch}
            type="text"
            placeholder="Jump To.."
          />
        )}

        {!isCollapsed && (
          <a className={styles.sideTabs} href="#section">
            <FontAwesomeIcon className={styles.iconGrid} icon={faBorderAll} />
            {!isCollapsed && <span>Meeting Rooms</span>}
          </a>
        )}
        {!isCollapsed && (
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
        )}
      </div>

      <Modal
        open={isCreateEventModalOpen}
        onOpenChange={setIsCreateEventModalOpen}
      >
        <Modal.Trigger asChild>
          <Button
            variant={isCollapsed ? 'ghost' : 'gradient'}
            className={isCollapsed ? styles.buttonCollapsed : styles.bookButton}
          >
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={
                isCollapsed ? styles.calendarIconCollapsed : styles.calendarIcon
              }
            />
            {!isCollapsed && <span>Book a Room</span>}
          </Button>
        </Modal.Trigger>

        <Modal.Content
          title={'Book a Room'}
          subtitle={'Select your prefered time and date.'}
        >
          <CreateEventForm
            calendars={calendars}
            afterSave={() => setIsCreateEventModalOpen(false)}
          />
        </Modal.Content>
      </Modal>
    </nav>
  );
}
export default SideNav;
