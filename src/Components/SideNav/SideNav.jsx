import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../Modal/Modal';
import { faCalendarAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import styles from './SideNav.module.css';
import CreateEventForm from '../Forms/CreateEventForm';
import AvailabilityCards from '../AvailabilityCards/AvailabilityCards';
import 'react-datepicker/dist/react-datepicker.css';
import SelectMenu from '../SelectMenu/SelectMenu';
import { ClipLoader } from 'react-spinners';
import Logo from '../../assets/logo.svg?react';
import Icon from '../../assets/icon.svg?react';

function SideNav({
  availabilities,
  center,
  setCenter,
  isLoadingAvailabilities,
  isCollapsed,
  className,
}) {
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] =
    React.useState(false);

  const availableCalendars = availabilities.filter(
    (calendar) => calendar.isAvailable == true
  );
  const busyCalendars = availabilities.filter(
    (calendar) => calendar.isAvailable == false
  );

  return (
    <nav className={`${className} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.topContainer}>
        <div className={styles.logoTitle}>
          {isCollapsed ? (
            <Icon className={styles.logoCollapsed} />
          ) : (
            <Logo className={styles.Logo} />
          )}

          {/* <img
            src={logo}
            alt="Placeholder Logo"
            className={
              isCollapsed ? styles.logoCollapsed : styles.placeholderLogo
            }
          />
          {!isCollapsed && <p>spacio</p>} */}
        </div>

        {/* {!isCollapsed && (
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
        )} */}

        <Modal
          open={isCreateEventModalOpen}
          onOpenChange={setIsCreateEventModalOpen}
        >
          <Modal.Trigger asChild>
            <Button
              variant={isCollapsed ? 'ghost' : 'gradient'}
              className={
                isCollapsed ? styles.buttonCollapsed : styles.bookButton
              }
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className={
                  isCollapsed
                    ? styles.calendarIconCollapsed
                    : styles.calendarIcon
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
              calendars={availableCalendars}
              afterSave={() => setIsCreateEventModalOpen(false)}
            />
          </Modal.Content>
        </Modal>

        {!isCollapsed && (
          <>
            <SelectMenu center={center} setCenter={setCenter}></SelectMenu>
            {isLoadingAvailabilities ? (
              <div className={styles.loadingContainer}>
                <ClipLoader />
              </div>
            ) : (
              <div className={styles.availabilityContainer}>
                {availableCalendars.length > 0 && (
                  <AvailabilityCards
                    header="Available"
                    calendarList={availableCalendars}
                    availableOptions={availableCalendars}
                  />
                )}

                {busyCalendars.length > 0 && (
                  <AvailabilityCards
                    header="Busy"
                    calendarList={busyCalendars}
                    availableOptions={availableCalendars}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
export default SideNav;
