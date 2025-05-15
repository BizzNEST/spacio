import { gapi } from 'gapi-script';

const deleteEvent = async (eventId) => {
  console.log("here")

  try {
    const response = await gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId
    });
       console.log('Event successfully deleted:', response);
    return response;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export default deleteEvent;