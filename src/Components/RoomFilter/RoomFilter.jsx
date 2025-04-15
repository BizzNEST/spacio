import React from 'react';
import styles from './RoomFilter.module.css';

const RoomFilter = ({ selectedRoomTypes, handleRoomTypeFilter }) => (
  <div className={styles.roomFilters}>
    <button
      className={`${styles.filterBtn} ${selectedRoomTypes.includes('all') ? styles.active : ''}`}
      onClick={() => handleRoomTypeFilter('all')}
    >
      All Rooms
    </button>
    <button
      className={`${styles.filterBtn} ${selectedRoomTypes.includes('phone') ? styles.active : ''}`}
      onClick={() => handleRoomTypeFilter('phone')}
    >
      Phone Booths
    </button>
    <button
      className={`${styles.filterBtn} ${selectedRoomTypes.includes('conference') ? styles.active : ''}`}
      onClick={() => handleRoomTypeFilter('conference')}
    >
      Conference Rooms
    </button>
  </div>
);

export default RoomFilter;
