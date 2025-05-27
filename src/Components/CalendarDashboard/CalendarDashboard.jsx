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
import Modal from '../Modal/Modal';
import EventCard from './calendarComponents/EventCard/EventCard';
import CalendarToolbar from '../CalendarToolbar/CalendarToolbar';
import ResourceHeader from '../ResourceHeader/ResourceHeader';
import styles from './CalendarDashboard.module.css';
import useFilterResourceByFloor from '../../hooks/useFilteredRooms';
import EditEventForm from '../Forms/EditEventForm';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MeetingRoomCalendar = ({ events, calendars }) => {
  const [filterType, setFilterType] = useState('all');
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), 'EEEE, MMMM dd, yyyy')
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const [currentView, setCurrentView] = React.useState(Views.DAY);

  const filterResources = useFilterResourceByFloor(calendars, filterType);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setIsModalOpen(true);
  };

  const handleSelectedEvent = (eventInfo) => {
    setSelectedEvent(eventInfo);
    setIsEventModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  // Format the time in the agenda view
  const formats = {
    timeGutterFormat: (date) => format(date, 'h:mma'),
  };
  return (
    <div className={styles.meetingRoomsContainer}>
      <div className={styles.calendarContainer}>
        <Calendar
          localizer={localizer}
          events={events}
          components={{
            event: (props) => <EventCard {...props} calendars={calendars} />,
            resourceHeader: ResourceHeader,
            toolbar: (props) => (
              <CalendarToolbar
                {...props}
                filterType={filterType}
                setFilterType={setFilterType}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                currentView={currentView}
                setCurrentView={setCurrentView}
                calendars={calendars}
              />
            ),
          }}
          defaultView={Views.DAY}
          views={[Views.DAY, Views.WORK_WEEK]}
          resources={filterResources}
          resourceIdAccessor="id"
          resourceTitleAccessor="title"
          // resourceHeaderAccessor={ResourceHeader}
          step={30}
          timeslots={1}
          min={new Date(new Date().setHours(9, 0, 0))}
          max={new Date(new Date().setHours(19, 0, 0))}
          formats={formats}
          showMultiDayTimes={true}
          toolbar={true}
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectedEvent}
          view={currentView}
          onView={(newView) => setCurrentView(newView)}
        />
      </div>

      {/* Modal for viewing/editing an event */}
      {isEventModalOpen && (
        <Modal open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
          <Modal.Content
            title={selectedEvent.title ? selectedEvent.title : '(No title)'}
          >
            <EditEventForm
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
              resources={calendars}
              afterSave={() => setIsEventModalOpen(false)}
            />
          </Modal.Content>
        </Modal>
      )}

      {/* Modal for creating a new event from clicking/dragging on the dashboard */}
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
                      {calendars.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              ,
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
