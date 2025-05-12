import React from 'react';
import { format, setHours, setMinutes } from 'date-fns';
import Button from '../Button/Button';
import { Trash2 } from 'react-feather';
import styles from './form.module.css';

const EditEventForm = ({
  selectedEvent,
  setSelectedEvent,
  resources,
  afterSave,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [draftEvent, setDraftEvent] = React.useState(selectedEvent);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

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
    // Perform the actual delete logic here
    console.log('Event deleted:', selectedEvent);
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

  const selectedRoomTitle =
    resources.find((room) => room.id === selectedEvent.resourceId)?.title ?? '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label>Event Name</label>
        {isEditing ? (
          <input
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
        ) : (
          <p>{selectedEvent.title ?? ''}</p>
        )}
      </div>

      <div className={styles.timeInputContainer}>
        <div className={styles.inputContainer}>
          <label>Date</label>
          {isEditing ? (
            <input
              disabled={!isEditing}
              type="date"
              value={format(selectedEvent.start, 'yyyy-MM-dd')}
              onChange={(e) => {
                const [year, month, day] = e.target.value
                  .split('-')
                  .map(Number);
                const newDate = new Date(selectedEvent.start);
                newDate.setFullYear(year, month - 1, day);

                setSelectedEvent({
                  ...selectedEvent,
                  start: newDate,
                });
              }}
            />
          ) : (
            <p>{format(selectedEvent.start, 'MMMM do yyyy')}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label>Start Time</label>
          {isEditing ? (
            <input
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
          ) : (
            <p>{format(selectedEvent.start, 'hh:mmaaa')}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label>End Time</label>
          {isEditing ? (
            <input
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
          ) : (
            <p>{format(selectedEvent.end, 'hh:mmaaa')}</p>
          )}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label>Room</label>
        {isEditing ? (
          <select
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
              if (selectedRoom) {
                setSelectedResource(selectedRoom.title);
              }
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
        ) : (
          <p>{selectedRoomTitle}</p>
        )}
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
        </div>
      )}
    </form>
  );
};

export default EditEventForm;
