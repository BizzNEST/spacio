import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import {
  format,
  parse,
  startOfWeek,
  getDay,
  setMinutes,
  setHours,
} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarDashboard.module.css'; // Using CSS modules
import Modal from '../Modal/Modal';
import EventCard from './calendarComponents/EventCard/EventCard';
import { useFetchAllEvents } from '../../api/events/useGetEvents';
import useFilteredRooms from '../../hooks/useFilteredRooms';
import useGetCalendars from '../../api/calendars/useGetCalendars';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

//TODO: This is still test data, we need to get this from Google Calendar API
// Room resources with additional metadata
const rooms = [
  { id: 1, title: 'Phone Booth 1', type: 'phone', capacity: 1, resourceId: 1 },
  { id: 2, title: 'Phone Booth 2', type: 'phone', capacity: 1, resourceId: 2 },
  { id: 3, title: 'Tony', type: 'conference', capacity: 8, resourceId: 3 },
  { id: 4, title: 'CPU', type: 'conference', capacity: 11, resourceId: 4 },
  { id: 5, title: 'Ideation', type: 'conference', capacity: 12, resourceId: 5 },
];

const MeetingRoomCalendar = () => {
  const [selectedRoomTypes, setSelectedRoomTypes] = useState(['all']);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState(null);

  const filteredRooms = useFilteredRooms(rooms, selectedRoomTypes);
  const { data: calendars, isLoading: isLoadingCalendars } =
    useGetCalendars(filteredRooms);
  const { data: events, isLoading: isLoadingEvents } = useFetchAllEvents(
    calendars,
    filteredRooms
  );

  if (isLoadingCalendars || isLoadingEvents) {
    return <div>Loading...</div>;
  }

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
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

  // Format the time in the agenda view
  const formats = {
    timeGutterFormat: (date) => format(date, 'h:mma'),
  };

  return (
    <div className={styles.meetingRoomsContainer}>
      <div className={styles.calendarHeader}>
        <h1>Salinas Center Rooms</h1>

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
            event: EventCard,
            // TODO: Component for ResourceHeader (Needs a Redesign)
            // resourceHeader: ResourceHeader,
            // TODO: Component for Toolbar (Date Picker and Room Filters)
            // toolbar: CalendarToolbar,
          }}
          defaultView={Views.DAY}
          views={[Views.DAY, Views.WORK_WEEK]}
          resources={filteredRooms}
          resourceIdAccessor="id"
          resourceTitleAccessor="title"
          // resourceHeaderAccessor={ResourceHeader}
          step={60}
          timeslots={1}
          min={new Date(new Date().setHours(9, 0, 0))}
          max={new Date(new Date().setHours(18, 0, 0))}
          formats={formats}
          showMultiDayTimes={true}
          toolbar={true}
          date={currentDate}
          onNavigate={handleNavigate}
          selectable={true}
          onSelectSlot={handleSelectSlot}
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

export default MeetingRoomCalendar;
