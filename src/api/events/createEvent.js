import { gapi } from 'gapi-script';
import { getAvailabilityByCalendarId } from '../availability/getAvailability';
import { format, isPast } from 'date-fns';

//Payload: calendarId, summary, start, end, attendees
const createEvent = async (payload) => {
  try {
    // Attempt to identify the Room (Resource) based on the assumption it is the first attendee
    // NOTE: If no room is selected, this might check availability for the first human guest.
    const resourceId = payload.attendees[0]?.email;

    const inPast = isPast(payload.end.dateTime);

    if (inPast) {
      throw new Error(
        'Unable to reserve room in past, please use current or future times.'
      );
    }

    // Only check availability if there is actually an attendee/room to check
    if (resourceId) {
      const availablityResponse = await getAvailabilityByCalendarId(
        resourceId,
        payload.start.dateTime,
        payload.end.dateTime
      );

      //If availablityResponse.busy array is empty, then the room is available
      const isAvailable = availablityResponse.busy.length === 0;

      if (!isAvailable) {
        //If the room is not available, save the busy slots
        const busyStartTime = format(
          availablityResponse.busy[0].start,
          'hh:mmaaa'
        );
        const busyEndTime = format(availablityResponse.busy[0].end, 'hh:mmaaa');

        //Return busy error
        throw new Error(`Room is busy from ${busyStartTime} to ${busyEndTime}`);
      }
    }

    // Create the event
    const response = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: payload,
      sendUpdates: 'all', // <--- THIS LINE IS THE FIX
    });

    return response;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export default createEvent;
