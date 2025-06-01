import React from 'react';
import Button from '../Button/Button';
import styles from './form.module.css';
import { addMinutes, setHours, setMinutes } from 'date-fns';
import { ClipLoader } from 'react-spinners';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../Modal/Modal';
import { combineDateAndTime, roundUpToNext15 } from './helpers';
import useCreateEvent from '../../api/events/useCreateEvent';
import { toast } from 'react-toastify';

const CreateEventForm = ({
  calendars,
  afterSave,
  calendarId,
  calendarName,
  selectedSlot, // from dragging on the calendar
}) => {
  const [requestError, setRequestError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const roundedStart = roundUpToNext15(new Date());

  // Get the selected slot's resource name
  let selectedSlotResourceName;
  if (selectedSlot) {
    const { title } = calendars.find(
      (calendar) => calendar.id === selectedSlot.resourceId
    );
    selectedSlotResourceName = title;
  }

  const [reservationData, setReservationData] = React.useState({
    name: 'New Event',
    date: new Date(),
    start: selectedSlot?.start ?? roundedStart,
    end: selectedSlot?.end ?? addMinutes(roundedStart, 15),
    resourceId: calendarId ?? selectedSlot?.resourceId ?? '',
    resourceName: calendarName ?? selectedSlotResourceName ?? '',
  });

  const isInvalidDateSelection = reservationData.start >= reservationData.end;

  const eventMutation = useCreateEvent();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const startDateTime = combineDateAndTime(
      reservationData.date,
      reservationData.start
    );

    const endDateTime = combineDateAndTime(
      reservationData.date,
      reservationData.end
    );

    const eventPayload = {
      summary: reservationData.name,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      attendees: reservationData.resourceId
        ? [{ email: reservationData.resourceId }]
        : [],
    };

    try {
      await eventMutation.mutateAsync(eventPayload);
      toast.success('Room booked successfully!');
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error creating event:', error);
      setIsSubmitting(false);
      setRequestError(error.message);
      return;
    }

    afterSave();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Name Selection */}
      <div className={styles.inputContainer}>
        <label htmlFor="name">Event Name</label>
        <input
          type="text"
          id="name"
          value={reservationData.name}
          onChange={(e) =>
            setReservationData({
              ...reservationData,
              name: e.target.value,
            })
          }
        />
      </div>

      {/* Room Selection */}
      <div className={styles.inputContainer}>
        <label>Available Rooms</label>

        <select
          required
          value={reservationData.resourceId || ''}
          onChange={(e) => {
            setReservationData((prev) => ({
              ...prev,
              resourceId: e.target.value,
              resourceName: e.target.options[e.target.selectedIndex].text,
            }));
          }}
        >
          <option
            value={reservationData.resourceId || ''}
            disabled={!reservationData.resourceId}
          >
            {reservationData.resourceName !== ''
              ? reservationData.resourceName
              : 'Select a room'}
          </option>
          {calendars.map((room) => (
            <option key={room.id} value={room.id}>
              {room.title}
            </option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className={styles.timeInputContainer}>
        <div className={styles.inputContainer}>
          <label>Date</label>
          <DatePicker
            className={styles.datePicker}
            selected={reservationData.date}
            onChange={(date) => {
              setReservationData({
                ...reservationData,
                date: date,
              });
            }}
          />
        </div>

        {/* Start Time Selection */}
        <div className={styles.inputContainer}>
          <label>Start Time</label>
          <DatePicker
            className={styles.datePicker}
            selected={reservationData.start}
            timeCaption="Start"
            dateFormat="hh:mm aa"
            timeIntervals={15}
            showTimeSelect
            showTimeSelectOnly
            showTimeCaption={false}
            minTime={setHours(setMinutes(new Date(), 45), 8)}
            maxTime={setHours(setMinutes(new Date(), 0), 18)}
            onChange={(date) => {
              setReservationData({
                ...reservationData,
                start: date,
              });
            }}
          />
        </div>

        {/* End Time Selection */}
        <div className={styles.inputContainer}>
          <label>End Time</label>
          <DatePicker
            className={styles.datePicker}
            selected={reservationData.end}
            timeCaption="End"
            dateFormat="hh:mm aa"
            timeIntervals={15}
            showTimeSelect
            showTimeSelectOnly
            showTimeCaption={false}
            minTime={reservationData.start}
            maxTime={setHours(setMinutes(new Date(), 0), 18)}
            onChange={(date) => {
              setReservationData({
                ...reservationData,
                end: date,
              });
            }}
          />
        </div>
      </div>

      {/* Error Message if start time is after end time */}
      {reservationData.start &&
        reservationData.end &&
        isInvalidDateSelection && (
          <p className={styles.error}>Start time must be before end time.</p>
        )}

      {/* Error Message if request fails */}
      {requestError && <p className={styles.error}>{requestError}</p>}

      <div className={styles.btnContainer}>
        <Button
          type="submit"
          variant="gradient"
          disabled={isInvalidDateSelection}
          className={
            isInvalidDateSelection || isSubmitting ? styles.disabledBtn : ''
          }
        >
          {isSubmitting ? 'Booking...' : 'Book Room'}
        </Button>
        <Modal.Close asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Modal.Close>
      </div>
    </form>
  );
};

export default CreateEventForm;
