import { gapi } from 'gapi-script';

const createEvent = async (formData) => {
  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: formData,
    });

    return response;
  } catch (error) {
    console.error('Error fetching calendar list:', error);
    return [];
  }
};

export default createEvent;
