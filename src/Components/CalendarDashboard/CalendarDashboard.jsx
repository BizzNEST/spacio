import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import {
  format,
  parse,
  startOfWeek,
  getDay,
  setMinutes,
  setHours,
  set,
} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarDashboard.module.css'; // Using CSS modules
import getEvents from '../../api/getEvents';
import getCalendars from '../../api/getCalendars';
import Modal from '../Modal/Modal';
import CustomEvent from './calendarComponents/CustomEvents/CustomEvents';
import useFetchAllEvents from '../../hooks/useFetchAllEvents';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Room resources with additional metadata
//TODO: This is still test data, we nneed to get this from Firebase
const rooms = [
  { id: 1, title: 'Phone Booth 1', type: 'phone', capacity: 1, resourceId: 1 },
  { id: 2, title: 'Phone Booth 2', type: 'phone', capacity: 1, resourceId: 2 },
  { id: 3, title: 'Tony', type: 'conference', capacity: 8, resourceId: 3 },
  { id: 4, title: 'CPU', type: 'conference', capacity: 11, resourceId: 4 },
  { id: 5, title: 'Ideation', type: 'conference', capacity: 12, resourceId: 5 },
];

// Meeting types with corresponding colors
const eventTypes = {
  client: 'lightblue', // light green
  internal: '#fff2cc', // light yellow
  interview: '#d4f7d9', // light green
};

const MeetingRoomCalendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const [selectedRoomTypes, setSelectedRoomTypes] = useState(['all']);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState(null);

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

  const handleSelectSlot = (slotInfo) => {
    console.log('Selected slot:', slotInfo);
    setSelectedSlot(slotInfo);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  //TODO: Move all these useEffects into their own hooks

  // Fetch events
  const events = useFetchAllEvents(calendars, filteredRooms);

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
        flexDirection: 'column',
        gap: '4px',
        backgroundColor,
      },
    };
  };

  // Format the time in the agenda view
  const formats = {
    timeGutterFormat: (date) => format(date, 'h:mm a'),
  };

  return (
    <div className={styles.meetingRoomsContainer}>
      <div className={styles.calendarHeader}>
        <h1>Salinas Center Rooms</h1>

        {/* <div
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
        </div> */}

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
          components={{
            event: CustomEvent,
            resourceHeader: ResourceHeader,
            // toolbar: CalendarToolbar,
          }}
          defaultView={Views.DAY}
          views={[Views.DAY, Views.WORK_WEEK]}
          resources={filteredRooms}
          resourceIdAccessor="id"
          resourceTitleAccessor="title"
          resourceHeaderAccessor={ResourceHeader}
          step={60}
          timeslots={1}
          min={new Date(new Date().setHours(9, 0, 0))}
          max={new Date(new Date().setHours(18, 0, 0))}
          formats={formats}
          eventPropGetter={eventStyleGetter}
          showMultiDayTimes={true}
          toolbar={true}
          date={currentDate}
          onNavigate={handleNavigate}
          selectable={true}
          onSelectSlot={() => setIsModalOpen(true)}
          onSelectEvent={(data) => console.log('On select event:', data)}
        />
      </div>

      {isModalOpen && (
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Modal.Content
            title="Book a Room"
            subtitle={
              selectedSlot
                ? `Selected: ${format(selectedSlot.start, 'MMMM do yyyy, h:mm a')} `
                : 'Select a date and time'
            }
          >
            <div>
              {selectedSlot && (
                <>
                  <div>
                    <label>Title:</label>
                    <input
                      type="text"
                      value={selectedSlot.title ?? ''}
                      placeholder="Event Title"
                      onChange={(e) =>
                        setSelectedSlot({
                          ...selectedSlot,
                          title: e.target.value,
                        })
                      }
                    />

                    <label>Date:</label>
                    <input
                      type="date"
                      value={format(selectedSlot.start, 'yyyy-MM-dd')}
                      onChange={(e) => {
                        const [year, month, day] = e.target.value
                          .split('-')
                          .map(Number);
                        const newDate = new Date(selectedSlot.start); // clone original date
                        newDate.setFullYear(year, month - 1, day); // update date part only

                        setSelectedSlot({
                          ...selectedSlot,
                          start: newDate,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label>Start Time:</label>
                    <input
                      type="time"
                      value={format(selectedSlot.start, 'HH:mm')}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value
                          .split(':')
                          .map(Number);
                        const newDate = setMinutes(
                          setHours(selectedSlot.start, hours),
                          minutes
                        );
                        setSelectedSlot({
                          ...selectedSlot,
                          start: newDate,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label>End Time:</label>
                    <input
                      type="time"
                      value={format(selectedSlot.end, 'HH:mm')}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value
                          .split(':')
                          .map(Number);
                        const newDate = setMinutes(
                          setHours(selectedSlot.end, hours),
                          minutes
                        );
                        setSelectedSlot({
                          ...selectedSlot,
                          end: newDate,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label>Room:</label>
                    <select
                      value={selectedSlot.resourceId ?? ''}
                      onChange={(e) =>
                        setSelectedSlot({
                          ...selectedSlot,
                          resourceId: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Select a room
                      </option>
                      {rooms.map((room) => (
                        <option key={room.resourceId} value={room.resourceId}>
                          {room.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <button onClick={handleClose} style={{ marginTop: '1rem' }}>
                Save Event
              </button>
            </div>
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
};

// Custom resource header to show room capacity
const ResourceHeader = ({ resource }) => {
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

export default MeetingRoomCalendar;
