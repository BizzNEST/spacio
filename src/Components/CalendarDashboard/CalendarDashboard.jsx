import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarDashboard.module.css'; // Using CSS modules
import getEvents from '../../api/getEvents';
import mockEvents from './mockEvents';
import getCalendars from '../../api/getCalendars';

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
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const [selectedRoomTypes, setSelectedRoomTypes] = useState(['all']);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [currentDate, setCurrentDate] = useState(new Date());

  console.log('Calendar: ', selectedCalendarId);

  const handleNavigate = async (newDate) => {
    setCurrentDate(newDate);

    if (
      gapi.auth2.getAuthInstance().isSignedIn.get() &&
      calendars.length > 0 &&
      rooms.length > 0
    ) {
      const allEvents = [];

      for (const calendar of calendars) {
        const calendarEvents = await getEvents(calendar.id, newDate);

        const matchedRoom = rooms.find((room) =>
          calendar.summary.includes(room.title)
        );

        if (matchedRoom) {
          const eventsWithResource = calendarEvents.map((event) => ({
            ...event,
            resourceId: matchedRoom.id,
          }));

          allEvents.push(...eventsWithResource);
        }
      }

      setEvents(allEvents);
    }
  };

  //TODO: Move all these useEffects into their own hooks

  // Fetch events
  useEffect(() => {
    const fetchAllEvents = async () => {
      const allEvents = [];

      for (const calendar of calendars) {
        const calendarEvents = await getEvents(calendar.id);

        const matchedRoom = rooms.find((room) =>
          calendar.summary.includes(room.title)
        );

        if (matchedRoom) {
          const eventsWithResource = calendarEvents.map((event) => ({
            ...event,
            resourceId: matchedRoom.id,
          }));

          allEvents.push(...eventsWithResource);
        }
      }

      setEvents(allEvents);
    };

    if (
      gapi.auth2.getAuthInstance().isSignedIn.get() &&
      calendars.length > 0 &&
      rooms.length > 0
    ) {
      fetchAllEvents();
    }
  }, [calendars, rooms]); // make sure both are included

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

  //Fetch Calendars
  useEffect(() => {
    const fetchCalendars = async () => {
      const calendarList = await getCalendars();

      // Filter only resource calendars by checking `calendarListEntry.kind === 'calendar#calendar'`
      // or using other resource-identifying logic (e.g., summary includes "resource" or matches a room)
      const resourceCalendars = calendarList.filter((calendar) =>
        rooms.some((room) => calendar.summary.includes(room.title))
      );

      setCalendars(resourceCalendars);
      setSelectedCalendarId(resourceCalendars[0]?.id || '');
    };

    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      fetchCalendars();
    }
  }, [rooms]); // include rooms here since we depend on them

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
        display: 'flex',
        alignItems: 'center',
        backgroundColor,
        width: '100%',
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

        <div
          className={styles.calendarSelect}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label htmlFor="calendar-select">Choose Room:</label>
          <select
            id="calendar-select"
            value={selectedCalendarId}
            onChange={(e) => setSelectedCalendarId(e.target.value)}
          >
            {calendars.map((calendar) => (
              <option key={calendar.id} value={calendar.id}>
                {calendar.summary}
              </option>
            ))}
          </select>
        </div>

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
          events={events}
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
          date={currentDate}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
};

export default MeetingRoomCalendar;
