import React, { useState, useEffect } from 'react';
import styles from './RoomBooking.module.css';
import { getAllRooms, createBooking } from '../../api/rooms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const RoomBooking = () => {
  // State for rooms
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [unavailableRooms, setUnavailableRooms] = useState([]); 
  const [selectedRooms, setSelectedRooms] = useState([]);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAvailableRooms, setShowAvailableRooms] = useState(true);
  const [showUnavailableRooms, setShowUnavailableRooms] = useState(false);
  
  
  const [bookingStatus, setBookingStatus] = useState(null);

  // Fetch rooms on initial load
  useEffect(() => {
    fetchRooms();
  }, []);


const fetchRooms = async () => {
  try {
    setLoading(true);
    setError(null);
    console.log("Fetching rooms...");
    const fetchedRooms = await getAllRooms();
    console.log("Rooms fetched:", fetchedRooms);
    setRooms(fetchedRooms);
    
        setAvailableRooms(fetchedRooms.filter(room => room.isAvailable));
        setUnavailableRooms(fetchedRooms.filter(room => !room.isAvailable));
        
        setSelectedRooms(prevSelected => 
          prevSelected.filter(roomId => 
            fetchedRooms.some(room => room.id === roomId && room.isAvailable)
          )
        );
        
        setLoading(false);

    } catch (err) {
      console.error("Error checking availability:", err);
      setError('Failed to fetch rooms: ' + err.message);
            setLoading(false);
    }
  };

  const handleRoomSelection = (roomId) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter(id => id !== roomId));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  const toggleAvailableRooms = () => {
    setShowAvailableRooms(!showAvailableRooms);
  };

  const toggleUnavailableRooms = () => {
    setShowUnavailableRooms(!showUnavailableRooms);
  };





  const bookSelectedRooms = async () => {
  if (selectedRooms.length === 0) {
    return;
  }
    try {
      setBookingStatus('processing');
      
      const bookingDetails = {
        roomIds: selectedRooms
      };
      
      const result = await createBooking(bookingDetails);
      
      setBookingStatus({
        success: true,
        message: `Booking confirmed for ${selectedRooms.length} room(s)!`
      });
      
      setSelectedRooms([]);
      
      
      setTimeout(() => {
        setBookingStatus(null);
      }, 3000);
      
    } catch (err) {
      console.error("Booking error:", err);
      setBookingStatus({
        success: false,
        message: `Booking failed: ${err.message}`
      });
      
      setTimeout(() => {
        setBookingStatus(null);
      }, 5000);
    }
  };

  if (loading && rooms.length === 0) {
    return <div className={styles.loading}>Loading rooms...</div>;
  }
  
  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={fetchRooms}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quick Look</h2>
      
      {bookingStatus && (
        <div className={`${styles.statusMessage} ${bookingStatus.success ? styles.success : styles.error}`}>
          {bookingStatus.message}
        </div>
      )}
      
      {loading && rooms.length > 0 && (
        <div className={styles.refreshing}>Checking availability...</div>
      )}
      
      <div className={styles.roomsSection}>
        <div 
          className={`${styles.sectionHeader} ${styles.available}`}
          onClick={toggleAvailableRooms}
        >
          <h3>
            <span className={styles.roomCount}>{availableRooms.length}</span> 
            {" "}Available Rooms
          </h3>
          <span className={styles.dropdownIcon}>
            {showAvailableRooms ? '▼' : '▶'}
          </span>
        </div>
        
        {showAvailableRooms && (
          <ul className={styles.roomsList}>
            {availableRooms.length === 0 ? (
              <li className={styles.emptyMessage}>No rooms available at this time</li>
            ) : (
              availableRooms.map(room => (
                <li key={room.id} className={styles.roomItem}>
                  <div className={styles.roomInfo}>
                    <div className={styles.roomName}>{room.name}</div>
                    <div className={styles.roomDetails}>
                      <span className={styles.roomCapacity}>
                      <FontAwesomeIcon icon={faUsers} />
                        <span>{room.capacity}</span>
                      </span>
                      <span className={styles.roomLocation}>
                        <span>{room.location}</span>
                      </span>
                      <span className={styles.roomFloor}>
                        <span>{" "}Floor {room.floor}</span>
                      </span>
                    </div>
                  </div>
                  
                  <label className={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      checked={selectedRooms.includes(room.id)}
                      onChange={() => handleRoomSelection(room.id)}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                </li>
              ))
            )}
          </ul>
        )}
        
        <div 
          className={`${styles.sectionHeader} ${styles.unavailable}`}
          onClick={toggleUnavailableRooms}
        >
          <h3>
            <span className={styles.roomCount}>{unavailableRooms.length}</span> 
            {" "} Unavailable Rooms
          </h3>
          <span className={styles.dropdownIcon}>
            {showUnavailableRooms ? '▼' : '▶'}
          </span>
        </div>
        
        {showUnavailableRooms && (
          <ul className={styles.roomsList}>
            {unavailableRooms.length === 0 ? (
              <li className={styles.emptyMessage}>All rooms are available at this time</li>
            ) : (
              unavailableRooms.map(room => (
                <li key={room.id} className={`${styles.roomItem} ${styles.unavailableRoom}`}>
                  <div className={styles.roomInfo}>
                    <div className={styles.roomName}>{room.name}</div>
                    <div className={styles.roomDetails}>
                      <span className={styles.roomCapacity}>
                      <FontAwesomeIcon icon={faUsers} /><span>{room.capacity}</span>
                      </span>
                      <span className={styles.roomLocation}>
                        <span>{room.location}</span>
                      </span>
                      <span className={styles.roomFloor}>
                        <span>{" "}Floor {room.floor}</span>
                      </span>
                    </div>
                  </div>
                  <div className={styles.bookedBadge}>Booked</div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      
      <button 
  className={`${styles.bookButton} ${selectedRooms.length > 0 ? styles.activeButton : styles.inactiveButton}`}
  onClick={bookSelectedRooms}
  disabled={selectedRooms.length === 0}
>
  {selectedRooms.length > 0 
    ? `Book ${selectedRooms.length} Room${selectedRooms.length > 1 ? 's' : ''}` 
    : 'Select a Room to Book'}
</button>

    </div>
  );
};

export default RoomBooking;