import { gapi } from 'gapi-script';

const deleteEvent = async (eventId) => {
  try {
    const response = await gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
    return response;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export default deleteEvent;
