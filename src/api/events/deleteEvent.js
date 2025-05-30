import { gapi } from 'gapi-script';

const deleteEvent = async (eventId) => {
  try {
    await gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export default deleteEvent;
