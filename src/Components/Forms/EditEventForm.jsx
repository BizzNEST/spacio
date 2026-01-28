import React from 'react';
import { addMinutes, set, setHours, setMinutes } from 'date-fns';
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
  const [requestError, setRequestError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [emailInput, setEmailInput] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const isInvalidDateSelection = selectedEvent.start >= selectedEvent.end;

  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  React.useEffect(() => {
    if (!isEditing) {
      setDraftEvent(selectedEvent);
    }
  }, [selectedEvent, isEditing]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddGuest = (e) => {
    e.preventDefault();
    setEmailError('');
    const email = emailInput.trim();

    if (!email) return;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Check for duplicates (handle both string and object formats)
    const currentAttendees = selectedEvent.attendees || [];
    const exists = currentAttendees.some((a) => (a.email || a) === email);

    if (exists) {
      setEmailError('This guest has already been added.');
      return;
    }

    // Add new guest
    setSelectedEvent({
      ...selectedEvent,
      attendees: [...currentAttendees, { email: email }],
    });
    setEmailInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGuest(e);
    }
  };

  const removeGuest = (emailToRemove) => {
    const currentAttendees = selectedEvent.attendees || [];
    setSelectedEvent({
      ...selectedEvent,
      attendees: currentAttendees.filter(
        (a) => (a.email || a) !== emailToRemove
      ),
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    //Save changes and reset draft
    setSelectedEvent(draftEvent);

    //Combine date and time
    const startDateTime = combineDateAndTime(
      selectedEvent.date,
      selectedEvent.start
    );

    const endDateTime = combineDateAndTime(
      selectedEvent.date,
      selectedEvent.end
    );

    const currentAttendees = selectedEvent.attendees || [];

    // Filter out the Room ID from the guest list so we don't add it twice
    const humanGuests = currentAttendees.filter(
      (a) => (a.email || a) !== selectedEvent.resourceId
    );

    // Ensure humans are formatted as objects {email: '...'}
    const formattedGuests = humanGuests.map((a) =>
      typeof a === 'string' ? { email: a } : { email: a.email }
    );

    // Add the Room Resource
    const resourceAttendee = selectedEvent.resourceId
      ? [{ email: selectedEvent.resourceId }]
      : [];

    const allAttendees = [...resourceAttendee, ...formattedGuests];

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
      attendees: allAttendees, // Send the combined list
    };

    //Update event
    try {
      await updateEventMutation.mutateAsync(eventPayload);
      toast.success('Reservation updated successfully!');
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setRequestError(error.message);
      return;
    }

    setIsEditing(false);
    setDraftEvent(null);

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
  const visibleAttendees = (selectedEvent.attendees || []).filter(
    (attendee) => attendee.email !== selectedEvent.resourceId
  );

  console.log('List of Attendees:', visibleAttendees);
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

      {/* --- 4. UPDATED GUESTS SECTION --- */}
      <div className={styles.inputContainer}>
        <label>Guests</label>

        {/* Input Field (Only when editing) */}
        {isEditing && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Enter guest email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                if (emailError) setEmailError('');
              }}
              onKeyDown={handleKeyDown}
              style={{ flex: 1 }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddGuest}
              disabled={!emailInput.trim()}
            >
              Add
            </Button>
          </div>
        )}

        {/* Error Message */}
        {isEditing && emailError && (
          <p
            className={styles.error}
            style={{ marginTop: '0', marginBottom: '10px' }}
          >
            {emailError}
          </p>
        )}

        {/* List */}
        {visibleAttendees.length > 0 ? (
          <ul className={styles.editAttendeeList}>
            {visibleAttendees.map((attendee) => {
              // Handle object vs string safely
              const emailText = attendee.email || attendee;

              if (!emailText || typeof emailText !== 'string') return null;

              return (
                <li key={emailText} className={styles.attendeeBox}>
                  <span style={{ flex: 1 }}>{emailText}</span>

                  {/* Remove Button (Only when editing) */}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeGuest(emailText)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ff4d4f',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        textDecoration: 'underline',
                        marginLeft: '10px',
                      }}
                    >
                      Remove
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p style={{ color: '#888', fontStyle: 'italic', marginTop: '5px' }}>
            No guests invited.
          </p>
        )}
      </div>

      {selectedEvent.isOrganizer && (
        <div className={styles.btnContainer}>
          <div>
            {isEditing && (
              <Button
                type="submit"
                variant="gradient"
                disabled={isInvalidDateSelection}
                className={
                  isInvalidDateSelection || isSubmitting
                    ? styles.disabledBtn
                    : ''
                }
              >
                {isSubmitting ? 'Updating...' : 'Save Changes'}
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
