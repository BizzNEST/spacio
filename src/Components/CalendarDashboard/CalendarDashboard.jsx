import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarDashboard.module.css'; // Using CSS modules
import getEvents from '../../api/getEvents';
import mockEvents from './mockEvents';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Room resources with additional metadata
const rooms = [
  { id: 1, title: 'Phone Booth 1', type: 'phone', capacity: 1 },
  { id: 2, title: 'Phone Booth 2', type: 'phone', capacity: 1 },
  { id: 3, title: 'Tony', type: 'conference', capacity: 8 },
  { id: 4, title: 'CPU', type: 'conference', capacity: 11 },
  { id: 5, title: 'Ideation', type: 'conference', capacity: 12 },
];

// Meeting types with corresponding colors
const eventTypes = {
  client: '#d4f7d9', // light green
  internal: '#fff2cc', // light yellow
  interview: '#d4f7d9', // light green
};

const MeetingRoomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState(['all']);
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      const formattedEvents = eventsData.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        resourceId: event.resourceId,
        eventType: event.eventType, // client, internal, interview, etc.
      }));
      setEvents(formattedEvents);
    };
    fetchEvents();
  }, []);

  // Filter rooms based on selected types
  useEffect(() => {
    if (selectedRoomTypes.includes('all')) {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(
        rooms.filter((room) => selectedRoomTypes.includes(room.type))
      );
    }
  }, [selectedRoomTypes]);

  // Handle room type filter selection
  const handleRoomTypeFilter = (type) => {
    if (type === 'all') {
      setSelectedRoomTypes(['all']);
    } else {
      const newSelection = selectedRoomTypes.includes('all')
        ? [type]
        : selectedRoomTypes.includes(type)
          ? selectedRoomTypes.filter((t) => t !== type)
          : [...selectedRoomTypes, type];

      setSelectedRoomTypes(newSelection.length ? newSelection : ['all']);
    }
  };

  // Custom event style based on event type
  const eventStyleGetter = (event) => {
    const backgroundColor = eventTypes[event.eventType] || '#d4f7d9';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        border: 'none',
        color: '#333',
        padding: '5px',
      },
    };
  };

  // Custom resource header to show room capacity
  const resourceHeader = ({ resource }) => {
    return (
      <div className={styles.resourceHeader}>
        <div className={styles.roomTitle}>{resource.title}</div>
        {resource.capacity && (
          <div className={styles.roomCapacity}>
            <span className={styles.capacityIcon}>👥</span> {resource.capacity}{' '}
            seats
          </div>
        )}
      </div>
    );
  };

  // Format the time in the agenda view
  const formats = {
    timeGutterFormat: (date) => format(date, 'h a'),
    eventTimeRangeFormat: ({ start, end }) => {
      return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
    },
  };

  return (
    <div className={styles.meetingRoomsContainer}>
      <div className={styles.calendarHeader}>
        <h1>Meeting Rooms</h1>

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
      </div>

      <div className={styles.calendarContainer}>
        <Calendar
          localizer={localizer}
          events={mockEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.DAY}
          views={[Views.DAY, Views.WORK_WEEK]}
          resources={filteredRooms}
          resourceIdAccessor="id"
          resourceTitleAccessor="title"
          resourceHeaderAccessor={resourceHeader}
          step={60}
          timeslots={1}
          min={new Date(new Date().setHours(8, 0, 0))}
          max={new Date(new Date().setHours(18, 0, 0))}
          formats={formats}
          eventPropGetter={eventStyleGetter}
          showMultiDayTimes={false}
          toolbar={true}
          date={new Date()}
          onNavigate={(date) => console.log(date)}
        />
      </div>
    </div>
  );
};

export default MeetingRoomCalendar;
