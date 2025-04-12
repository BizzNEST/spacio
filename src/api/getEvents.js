import { gapi } from 'gapi-script';
import { calendarToRoomMap } from '../helpers/calendarToRoomMap';

const getEvents = async (calendarId = 'primary') => {
  try {
    const response = await gapi.client.calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 50,
      orderBy: 'startTime',
    });

    const events = response.result.items.map((event) => ({
      title: event.summary || '(No Title)',
      start: new Date(event.start.dateTime || event.start.date), // Full-day events have only 'date'
      end: new Date(event.end.dateTime || event.end.date),
      eventType: 'client', // or parse from event.summary if needed
      resourceId: calendarToRoomMap[calendarId],
    }));

    return events;
  } catch (error) {
    console.error('Error fetching events from Google Calendar:', error);
    return [];
  }
};

export default getEvents;
