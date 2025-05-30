import React from 'react';
import { addMinutes, format, setHours, setMinutes } from 'date-fns';
import Button from '../Button/Button';
import { Trash2 } from 'react-feather';
import styles from './form.module.css';
import useDeleteEvent from '../../api/events/useDeleteEvents';
import DatePicker from 'react-datepicker';
import { combineDateAndTime } from './helpers';
import useUpdateEvent from '../../api/events/useUpdateEvent';
import { toast } from 'react-toastify';

const EditEventForm = ({
  selectedEvent,
  setSelectedEvent,
  resources,
  afterSave,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [draftEvent, setDraftEvent] = React.useState(selectedEvent);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const isInvalidDateSelection = selectedEvent.start >= selectedEvent.end;

  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  React.useEffect(() => {
    if (!isEditing) {
      setDraftEvent(selectedEvent);
    }
  }, [selectedEvent, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Save changes and reset draft
    setSelectedEvent(draftEvent);
    setIsEditing(false);
    setDraftEvent(null);

    //Combine date and time
    const startDateTime = combineDateAndTime(
      selectedEvent.date,
      selectedEvent.start
    );

    const endDateTime = combineDateAndTime(
      selectedEvent.date,
      selectedEvent.end
    );

    //Prepare event payload
    const eventPayload = {
      id: selectedEvent.id,
      summary: selectedEvent.title,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      attendees: selectedEvent.resourceId
        ? [{ email: selectedEvent.resourceId }]
        : [],
    };

    //Update event
    toast.promise(updateEventMutation.mutateAsync(eventPayload), {
      pending: 'Updating room. Please wait...',
      success: 'Room updated successfully!',
      error: {
        render({ data }) {
          return data?.message || 'Something went wrong! Please try again.';
        },
      },
    });

    afterSave();
  };

  const handleDelete = () => {
    const eventId = selectedEvent.id;
    const resourceId = selectedEvent.resourceId;
    deleteEventMutation.mutate({ eventId, resourceId });
    toast.success('Reservation deleted sucessfully!');
    setConfirmDelete(false);
    afterSave();
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Cancel editing: revert changes
      setSelectedEvent(draftEvent);
      setIsEditing(false);
    } else {
      // Enter edit mode: save current state as draft
      setDraftEvent(selectedEvent);
      setIsEditing(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Name Selection */}
      <div className={styles.inputContainer}>
        <label htmlFor="name">Event Name</label>
        <input
          id="name"
          className={isEditing ? ' ' : styles.disabled}
          type="text"
          disabled={!isEditing}
          value={selectedEvent.title ?? ''}
          placeholder="Event Title"
          onChange={(e) =>
            setSelectedEvent({
              ...selectedEvent,
              title: e.target.value,
            })
          }
        />
      </div>

      {/* Room Selection */}
      <div className={styles.inputContainer}>
        <label>Room</label>
        <select
          className={isEditing ? ' ' : styles.disabled}
          disabled={!isEditing}
          value={selectedEvent.resourceId ?? ''}
          onChange={(e) => {
            const selectedRoom = resources.find(
              (room) => room.id === e.target.value
            );
            setSelectedEvent({
              ...selectedEvent,
              resourceId: e.target.value,
            });
          }}
        >
          <option value="" disabled>
            Select a room
          </option>
          {resources.map((room) => (
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
            disabled={!isEditing}
            className={
              isEditing
                ? styles.datePicker
                : `${styles.datePicker} ${styles.disabled}`
            }
            selected={selectedEvent.date}
            onChange={(date) => {
              setSelectedEvent({
                ...selectedEvent,
                date: date,
              });
            }}
          />
        </div>

        {/* Start Time Selection */}
        <div className={styles.inputContainer}>
          <label>Start Time</label>
          <DatePicker
            disabled={!isEditing}
            className={
              isEditing
                ? styles.datePicker
                : `${styles.datePicker} ${styles.disabled}`
            }
            selected={selectedEvent.start}
            timeCaption="Start"
            dateFormat="hh:mm aa"
            timeIntervals={15}
            showTimeSelect
            showTimeSelectOnly
            showTimeCaption={false}
            minTime={setHours(setMinutes(new Date(), 45), 8)}
            maxTime={setHours(setMinutes(new Date(), 0), 18)}
            onChange={(startTime) => {
              setSelectedEvent({
                ...selectedEvent,
                start: startTime,
              });
            }}
          />
        </div>

        {/* End Time Selection */}
        <div className={styles.inputContainer}>
          <label>End Time</label>
          <DatePicker
            disabled={!isEditing}
            className={
              isEditing
                ? styles.datePicker
                : `${styles.datePicker} ${styles.disabled}`
            }
            selected={selectedEvent.end}
            timeCaption="End"
            dateFormat="hh:mm aa"
            timeIntervals={15}
            showTimeSelect
            showTimeSelectOnly
            showTimeCaption={false}
            minTime={addMinutes(selectedEvent.start, 15)}
            maxTime={setHours(setMinutes(new Date(), 0), 18)}
            onChange={(endTime) => {
              setSelectedEvent({
                ...selectedEvent,
                end: endTime,
              });
            }}
          />
        </div>
      </div>

      {/* Error Message if start time is after end time */}
      {selectedEvent.start && selectedEvent.end && isInvalidDateSelection && (
        <p className={styles.error}>Start time must be before end time.</p>
      )}

      {selectedEvent.isOrganizer && (
        <div className={styles.btnContainer}>
          <div>
            {isEditing && (
              <Button
                type="submit"
                variant="gradient"
                disabled={isInvalidDateSelection}
                className={isInvalidDateSelection ? styles.disabledBtn : ''}
              >
                Save Event
              </Button>
            )}
            <Button type="button" onClick={toggleEdit} variant="outline">
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          <div>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                if (confirmDelete) {
                  handleDelete();
                } else {
                  setConfirmDelete(true);
                }
              }}
            >
              {confirmDelete ? (
                'Confirm Delete'
              ) : (
                <Trash2 height={20} width={20} />
              )}
            </Button>

            {confirmDelete && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default EditEventForm;
