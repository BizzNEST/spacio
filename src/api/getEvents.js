import { gapi } from 'gapi-script';
import { calendarToRoomMap } from '../helpers/calendarToRoomMap';

const getEvents = async (calendarId = 'primary') => {
  try {
    //Make the request to Google Calendar with specified parameters
    const response = await gapi.client.calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 50,
      orderBy: 'startTime',
    });

    //Return an array of events objects with the values we want
    const events = response.result.items.map((event) => ({
      title: event.summary || '(No Title)',
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
      //This will map the calendar id to the room id we have in our helper function
      resourceId: calendarToRoomMap[calendarId],
    }));

    return events;
  } catch (error) {
    console.error('Error fetching events from Google Calendar:', error);
    return [];
  }
};

export default getEvents;
