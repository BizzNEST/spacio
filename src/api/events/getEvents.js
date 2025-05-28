import { gapi } from 'gapi-script';
import { startOfToday } from 'date-fns';

const getEvents = async (calendarId = 'primary', userInfo) => {
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
    const events = response.result.items
      .map((event) => {
        if (!event.start.dateTime || !event.end.dateTime) {
          return {};
        }

        // Check if this event has resources and if they're accepted
        if (event.attendees) {
          for (const attendee of event.attendees) {
            if (attendee.resource && attendee.responseStatus !== 'accepted') {
              return {}; 
            }
          }
        }
        const attendeeNames = event.attendees
          ? event.attendees
              .filter((a) => !a.resource)
              .map((a) => a.displayName || (a.email?.split('@')[0] ?? 'Unknown'))
          : [];

      const isOrganizer = event.organizer?.email === userInfo.email;

      return {
        id: event.id,
        title: event.summary || '(No Title)',
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
        date: new Date(event.start.dateTime),

        attendees: attendeeNames,
        resourceId: calendarId,
        isOrganizer,
      };
    });

    return events;
  } catch (error) {
    console.error('Error fetching events from Google Calendar:', error);
    return [];
  }
};

export default getEvents;
