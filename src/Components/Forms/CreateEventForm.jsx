import React from 'react';
import Button from '../Button/Button';
import styles from './form.module.css';
import { addMinutes, setHours, setMinutes } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../Modal/Modal';
import { combineDateAndTime, roundUpToNext15 } from './helpers';
import useCreateEvent from '../../api/events/useCreateEvent';

const CreateEventForm = ({
  calendars,
  afterSave,
  calendarId,
  calendarName,
}) => {
  console.log('Cal id: ', calendarId);
  const roundedStart = roundUpToNext15(new Date());
  const [reservationData, setReservationData] = React.useState({
    name: 'New Event',
    date: new Date(),
    start: roundedStart,
    end: addMinutes(roundedStart, 15),
    resourceId: calendarId ?? ' ',
  });

  const eventMutation = useCreateEvent();

  const selectedRoom = calendars.find(
    (room) => room.calendarId === reservationData.resourceId
  );
  //console.log('calendars: ', calendars);
  //console.log('SEL ROOM: ', selectedRoom);
  const handleSubmit = (event) => {
    event.preventDefault();
    const startDateTime = combineDateAndTime(
      reservationData.date,
      reservationData.start
    );

    const endDateTime = combineDateAndTime(
      reservationData.date,
      reservationData.end
    );

    const eventPayload = {
      calendarId: 'primary',
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

    eventMutation.mutate(eventPayload);
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
        <label>Room</label>
        {console.log('Selected cal ID:', reservationData.resourceId)}
        <select
          required
          value={reservationData.resourceId ?? ''}
          onChange={(e) => {
            console.log('Selected value:', e.target.value);
            setReservationData({
              ...reservationData,
              resourceId: e.target.value,
            });
          }}
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

      <div className={styles.btnContainer}>
        <Button type="submit" variant="gradient">
          Book
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
