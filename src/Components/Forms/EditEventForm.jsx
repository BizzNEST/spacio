import React from 'react';
import { format, setHours, setMinutes } from 'date-fns';
import Button from '../Button/Button';
import { Trash2 } from 'react-feather';
import styles from './form.module.css';
import useDeleteEvent from '../../api/events/useDeleteEvents';

const EditEventForm = ({
  selectedEvent,
  setSelectedEvent,
  resources,
  afterSave,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [draftEvent, setDraftEvent] = React.useState(selectedEvent);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const deleteEventMutation = useDeleteEvent();

  React.useEffect(() => {
    if (!isEditing) {
      setDraftEvent(selectedEvent);
    }
  }, [selectedEvent, isEditing]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedEvent(draftEvent);
    setIsEditing(false);
    setDraftEvent(null);
    console.log(selectedEvent);
    afterSave();
  };

  const handleDelete = () => {
    const eventId = selectedEvent.id;
    deleteEventMutation.mutate(eventId);
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

      <div className={styles.timeInputContainer}>
        <div className={styles.inputContainer}>
          <label>Date</label>
          <input
            className={isEditing ? ' ' : styles.disabled}
            disabled={!isEditing}
            type="date"
            value={format(selectedEvent.start, 'yyyy-MM-dd')}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split('-').map(Number);
              const newDate = new Date(selectedEvent.start);
              newDate.setFullYear(year, month - 1, day);

              setSelectedEvent({
                ...selectedEvent,
                start: newDate,
              });
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Start Time</label>
          <input
            className={isEditing ? ' ' : styles.disabled}
            disabled={!isEditing}
            type="time"
            value={format(selectedEvent.start, 'HH:mm')}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              const newDate = setMinutes(
                setHours(selectedEvent.start, hours),
                minutes
              );
              setSelectedEvent({
                ...selectedEvent,
                start: newDate,
              });
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>End Time</label>
          <input
            className={isEditing ? ' ' : styles.disabled}
            disabled={!isEditing}
            type="time"
            value={format(selectedEvent.end, 'HH:mm')}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              const newDate = setMinutes(
                setHours(selectedEvent.end, hours),
                minutes
              );
              setSelectedEvent({
                ...selectedEvent,
                end: newDate,
              });
            }}
          />
        </div>
      </div>

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

      {selectedEvent.isOrganizer && (
        <div className={styles.btnContainer}>
          <div>
            {isEditing && (
              <Button type="submit" variant="gradient">
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
