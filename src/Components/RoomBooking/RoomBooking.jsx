import React, { useState, useEffect } from 'react';
import styles from './RoomBooking.module.css';
// import RoomService from './RoomService'; // Import the service for API calls
// import { format } from 'date-fns';

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
  
  // Date and time selection
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  
  // Booking status
  const [bookingStatus, setBookingStatus] = useState(null);

  // Fetch rooms on initial load
  useEffect(() => {
    fetchRooms();
  }, []);

  // Check availability when date/time selection changes
  useEffect(() => {
    if (rooms.length > 0) {
      checkRoomAvailability();
    }
  }, [selectedDate, startTime, endTime, rooms]);

  // RoomData Fetching: Get all rooms from the database
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching rooms...");
      const fetchedRooms = await RoomService.getAllRooms();
      console.log("Rooms fetched:", fetchedRooms);
      setRooms(fetchedRooms);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError('Failed to fetch rooms: ' + err.message);
      setLoading(false);
    }
  };

  // Availability checking: Filter rooms into available and unavailable lists
  const checkRoomAvailability = async () => {
    try {
      setLoading(true);
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      console.log("Checking availability for:", formattedDate, startTime, endTime);
      
      // Call the API to check availability
      const availabilityData = await RoomService.checkAvailability(
        formattedDate,
        startTime,
        endTime
      );
      
      // Filter rooms based on availability
      const available = rooms.filter(room => room.isAvailable);
      const unavailable = rooms.filter(room => !room.isAvailable);
      
      setAvailableRooms(available);
      setUnavailableRooms(unavailable);
      setLoading(false);
      
      // Remove any selected rooms that are now unavailable
      setSelectedRooms(prevSelected => 
        prevSelected.filter(roomId => 
          available.some(room => room.id === roomId)
        )
      );
    } catch (err) {
      console.error("Error checking availability:", err);
      setError('Failed to check room availability: ' + err.message);
      setLoading(false);
    }
  };

  // Toggle room selection when user clicks checkbox
  const handleRoomSelection = (roomId) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter(id => id !== roomId));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  // Toggle showing available rooms section
  const toggleAvailableRooms = () => {
    setShowAvailableRooms(!showAvailableRooms);
  };

  // Toggle showing unavailable rooms section
  const toggleUnavailableRooms = () => {
    setShowUnavailableRooms(!showUnavailableRooms);
  };

  // Handle date selection change
  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  // Handle start time change
  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  // Handle end time change
  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  // Book selected rooms
  const bookSelectedRooms = async () => {
    try {
      setBookingStatus('processing');
      
      // Gather booking details
      const bookingDetails = {
        date: format(selectedDate, 'yyyy-MM-dd'),
        start_time: startTime,
        end_time: endTime,
        title: `Room Booking for ${new Date().toLocaleDateString()}`,
        roomIds: selectedRooms
      };
      
      // Call API to create booking
      const result = await RoomService.createBooking(bookingDetails);
      
      setBookingStatus({
        success: true,
        message: `Booking confirmed for ${selectedRooms.length} room(s)!`
      });
      
      // Reset selection after successful booking
      setSelectedRooms([]);
      
      // Refresh availability after booking
      checkRoomAvailability();
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setBookingStatus(null);
      }, 3000);
      
    } catch (err) {
      console.error("Booking error:", err);
      setBookingStatus({
        success: false,
        message: `Booking failed: ${err.message}`
      });
      
      // Auto-clear error message after 5 seconds
      setTimeout(() => {
        setBookingStatus(null);
      }, 5000);
    }
  };

  // Show loading state when initially fetching rooms
  if (loading && rooms.length === 0) {
    return <div className={styles.loading}>Loading rooms...</div>;
  }
  
  // Show error state
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
      <h2 className={styles.title}>Book a Room</h2>
      
      {/* Show booking status messages */}
      {bookingStatus && (
        <div className={`${styles.statusMessage} ${bookingStatus.success ? styles.success : styles.error}`}>
          {bookingStatus.message}
        </div>
      )}
      
      {/* Date and time selection section */}
      <div className={styles.dateTimeSelector}>
        <div className={styles.inputGroup}>
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={handleDateChange}
            className={styles.dateInput}
          />
        </div>
        
        <div className={styles.timeRangeSelector}>
          <div className={styles.inputGroup}>
            <label htmlFor="startTime">From:</label>
            <input 
              type="time" 
              id="startTime"
              value={startTime}
              onChange={handleStartTimeChange}
              className={styles.timeInput}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="endTime">To:</label>
            <input 
              type="time" 
              id="endTime"
              value={endTime}
              onChange={handleEndTimeChange}
              className={styles.timeInput}
            />
          </div>
        </div>
      </div>
      
      {/* Loading indicator when checking availability */}
      {loading && rooms.length > 0 && (
        <div className={styles.refreshing}>Checking availability...</div>
      )}
      
      {/* Available and unavailable rooms sections */}
      <div className={styles.roomsSection}>
        {/* Available Rooms Section */}
        <div 
          className={`${styles.sectionHeader} ${styles.available}`}
          onClick={toggleAvailableRooms}
        >
          <h3>
            <span className={styles.roomCount}>{availableRooms.length}</span> 
            Available Rooms
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
                        <span className={styles.capacityIcon}>👥</span>
                        <span>{room.capacity}</span>
                      </span>
                      <span className={styles.roomLocation}>
                        <span className={styles.locationIcon}>📍</span>
                        <span>{room.location}</span>
                      </span>
                      <span className={styles.roomFloor}>
                        <span className={styles.floorIcon}>🏢</span>
                        <span>Floor {room.floor}</span>
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
        
        {/* Unavailable Rooms Section */}
        <div 
          className={`${styles.sectionHeader} ${styles.unavailable}`}
          onClick={toggleUnavailableRooms}
        >
          <h3>
            <span className={styles.roomCount}>{unavailableRooms.length}</span> 
            Unavailable Rooms
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
                        <span className={styles.capacityIcon}>👥</span>
                        <span>{room.capacity}</span>
                      </span>
                      <span className={styles.roomLocation}>
                        <span className={styles.locationIcon}>📍</span>
                        <span>{room.location}</span>
                      </span>
                      <span className={styles.roomFloor}>
                        <span className={styles.floorIcon}>🏢</span>
                        <span>Floor {room.floor}</span>
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
      
      {/* Book button - only shows when rooms are selected */}
      {selectedRooms.length > 0 && (
        <button 
          className={styles.bookButton}
          onClick={bookSelectedRooms}
        >
          Book {selectedRooms.length} Room{selectedRooms.length > 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
};

export default RoomBooking;