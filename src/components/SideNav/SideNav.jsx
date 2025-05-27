import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../Modal/Modal';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import CreateEventForm from '../Forms/CreateEventForm';
import AvailabilityCards from '../AvailabilityCards/AvailabilityCards';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import NavLink from '../NavLink/NavLink';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './SideNav.module.css';
import SelectMenu from '../SelectMenu/SelectMenu';

function SideNav({ availabilities, center, setCenter }) {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] =
    React.useState(false);

  const availableCalendars = availabilities.filter(
    (calendar) => calendar.isAvailable == true
  );
  const busyCalendars = availabilities.filter(
    (calendar) => calendar.isAvailable == false
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
        <NavLink
          links={[
            {
              path: '/home',
              label: 'Meeting Rooms',
              className: styles.meetingRooms,
              icon: <FontAwesomeIcon icon={faCalendar} />,
            },
            // {To Do: Uncomment once Floor Plan is implemented}
            // {
            //   path: '/floor-map',
            //   label: 'Floor Map',
            //   className: styles.floorMap,
            //   icon: <FontAwesomeIcon icon={faBuilding} />,
            // },
          ]}
        />

        <SelectMenu center={center} setCenter={setCenter}></SelectMenu>

        <div className={styles.availabilityContainer}>
          {availableCalendars.length > 0 && (
            <AvailabilityCards
              header="Available"
              calendarList={availableCalendars}
            />
          )}

          {busyCalendars.length > 0 && (
            <AvailabilityCards header="Busy" calendarList={busyCalendars} />
          )}
        </div>
      </div>

      <Modal
        open={isCreateEventModalOpen}
        onOpenChange={setIsCreateEventModalOpen}
      >
        <Modal.Trigger asChild>
          <Button variant="gradient" className={styles.bookButton}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            Book a Room
          </Button>
        </Modal.Trigger>

        <Modal.Content
          title={'Book a Room'}
          subtitle={'Select your prefered time and date.'}
        >
          <CreateEventForm
            calendars={availableCalendars}
            afterSave={() => setIsCreateEventModalOpen(false)}
          />
        </Modal.Content>
      </Modal>
    </nav>
  );
}
export default SideNav;
