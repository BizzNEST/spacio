import { gapi } from 'gapi-script';
import { addMonths, startOfToday } from 'date-fns';

const getEvents = async (calendarId = 'primary', userInfo, people) => {
  try {
    //Make the request to Google Calendar with specified parameters
    const response = await gapi.client.calendar.events.list({
      calendarId,
      timeMin: startOfToday().toISOString(),
      timeMax: addMonths(startOfToday(), 3).toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Create a map of email to name
    const peopleMap = people.reduce((acc, person) => {
      const email = person.email?.toLowerCase();

      //Split the name into first name and last name
      const nameParts = person.name?.trim().split(' ');
      if (email && nameParts?.length > 0) {
        const formattedName =
          nameParts.length > 1
            ? `${nameParts[0]} ${nameParts[1][0]}.`
            : nameParts[0];
        acc[email] = formattedName;
      }
      return acc;
    }, {});

    //Return an array of events objects with the values we want
    const events = response.result.items.map((event) => {
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
            .map(
              (a) => peopleMap[a.email] || (a.email?.split('@')[0] ?? 'Unknown')
            )
        : [];

      const isOrganizer = event.organizer?.email === userInfo.email;
      const bookedBy =
        peopleMap[event.organizer?.email] || peopleMap[event.creator?.email];

      return {
        id: event.id,
        title: event.summary || '(No Title)',
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
        date: new Date(event.start.dateTime),
        attendees: attendeeNames,
        resourceId: calendarId,
        isOrganizer,
        bookedBy,
      };
    });

    return events;
  } catch (error) {
    console.error('Error fetching events from Google Calendar:', error);
    return [];
  }
};

export default getEvents;
