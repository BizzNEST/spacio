import { gapi } from 'gapi-script';
import { addMinutes } from 'date-fns';

const createEvents = async (formData) => {
  console.log('In Here');
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

export default createEvents;
