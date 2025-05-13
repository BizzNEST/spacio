import { gapi } from 'gapi-script';
import { addMinutes } from 'date-fns';

const createEvents = async (formData) => {
  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: {
        summary: formData.title,
        start: {
          dateTime: formData.startDate,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: formData.endDate,
          timeZone: 'America/Los_Angeles',
        },
        attendees: formData.calendarId
          ? [
              {
                email: formData.calendarId,
                resource: true,
              },
            ]
          : [],
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching calendar list:', error);
    return [];
  }
};

export default createEvents;
