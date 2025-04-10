import React from 'react';
import styles from './SideNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import fetchRooms from '../../api/fetchRooms';
import SelectMenu from '../SelectMenu/SelectMenu';

function SideNav() {
  const [center, setCenter] = React.useState('Salinas');
  const [rooms, setRooms] = React.useState([]);
  React.useEffect(() => {
    async function fetchingRooms() {
      try {
        const roomsData = await fetchRooms(center);
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
    fetchingRooms();
  }, [center]);
  console.log(rooms, 'roomsData');
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

        <a className={styles.sideTabs} href="#section">
          <FontAwesomeIcon className={styles.iconGrid} icon={faBorderAll} />
          Meeting Rooms
        </a>
        <SelectMenu center={center} setCenter={setCenter}></SelectMenu>
        <div className={styles.roomAvailabilityBox}>
          <ul className={styles.roomAvailabilityList}>
            {rooms.map((room) => {
              return (
                <li key={room.id} className={styles.roomItem}>
                  <span className={styles.roomName}>
                    {room.name} -{' '}
                    <span
                      className={
                        room.isAvailable
                          ? styles.roomAvailable
                          : styles.roomNotAvailable
                      }
                    >
                      {room.isAvailable ? 'Available' : 'Not available'}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Modal>
        <Modal.Trigger className={styles.desktopBookRoom}>
          Book a Room
        </Modal.Trigger>
        <Modal.Content
          title={'Book a Room'}
          subtitle={'Select your prefered time and date.'}
        ></Modal.Content>
      </Modal>
    </nav>
  );
}
export default SideNav;
