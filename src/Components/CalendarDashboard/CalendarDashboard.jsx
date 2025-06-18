import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from '../Modal/Modal';
import EventCard from './calendarComponents/EventCard/EventCard';
import CalendarToolbar from '../CalendarToolbar/CalendarToolbar';
import ResourceHeader from '../ResourceHeader/ResourceHeader';
import styles from './CalendarDashboard.module.css';
import useFilterResourceByFloor from '../../hooks/useFilteredRooms';
import EditEventForm from '../Forms/EditEventForm';
import CreateEventForm from '../Forms/CreateEventForm';
import { ClipLoader } from 'react-spinners';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MeetingRoomCalendar = ({ events, calendars, isLoadingEvents }) => {
  const [filterType, setFilterType] = useState('all');
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), 'EEEE, MMMM dd, yyyy')
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [currentView, setCurrentView] = React.useState(Views.DAY);

  const filterResources = useFilterResourceByFloor(calendars, filterType);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setIsCreateModalOpen(true);
  };

  const handleSelectedEvent = (eventInfo) => {
    setSelectedEvent(eventInfo);
    setIsEventModalOpen(true);
  };

  // Format the time in the agenda view
  const formats = {
    timeGutterFormat: (date) => format(date, 'h:mma'),
  };

  if (isLoadingEvents) {
    return (
      <div className={styles.loaderContainer}>
        <p>Loading Calendar...</p>
        <ClipLoader />
      </div>
    );
  }

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
          step={15}
          timeslots={2}
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
            subtitle={
              selectedEvent.bookedBy && `Booked by: ${selectedEvent.bookedBy}`
            }
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
      {isCreateModalOpen && (
        <Modal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <Modal.Content
            title="Book a Room"
            subtitle={
              selectedSlot
                ? `Selected: ${format(selectedSlot.start, 'MMMM do yyyy, h:mm a')} `
                : 'Select a date and time'
            }
          >
            <CreateEventForm
              calendars={calendars}
              selectedSlot={selectedSlot}
              afterSave={() => setIsCreateModalOpen(false)}
            />
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
};

export default MeetingRoomCalendar;
