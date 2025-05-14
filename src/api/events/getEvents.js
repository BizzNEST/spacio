import { gapi } from 'gapi-script';
import { startOfToday } from 'date-fns';

const getEvents = async (calendarId = 'primary') => {
  try {
    //Make the request to Google Calendar with specified parameters
    const response = await gapi.client.calendar.events.list({
      calendarId,
      timeMin: startOfToday().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 25,
      orderBy: 'startTime',
    });

    //Return an array of events objects with the values we want
    const events = response.result.items.map((event) => {
      const attendeeNames = event.attendees
        ? event.attendees
            .filter((a) => !a.resource)
            .map((a) => a.displayName || (a.email?.split('@')[0] ?? 'Unknown'))
        : [];

      return {
        id: event.id,
        title: event.summary || '(No Title)',
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
        attendees: attendeeNames,
        resourceId: calendarId,
      };
    });

    return events;
  } catch (error) {
    console.error('Error fetching events from Google Calendar:', error);
    return [];
  }
};

export default getEvents;
