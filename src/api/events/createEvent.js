import { gapi } from 'gapi-script';
import { getAvailabilityByCalendarId } from '../availability/getAvailability';
import { format, isPast } from 'date-fns';

//Payload: calendarId, summary, start, end, attendees
const createEvent = async (payload) => {
  try {
    const resourceId = payload.attendees[0]?.email;

    const inPast = isPast(payload.end.dateTime);

    if (inPast) {
      throw new Error(
        'Unable to reserve room in past, please use current or future times.'
      );
    }

    //Make sure resource is available before creating event
    const availablityResponse = await getAvailabilityByCalendarId(
      resourceId,
      payload.start.dateTime,
      payload.end.dateTime
    );

    //If availablityResponse.busy array is empty, then the room is available
    const isAvailable = availablityResponse.busy.length === 0;

    let busyStartTime = null;
    let busyEndTime = null;

    if (!isAvailable) {
      //If the room is not available, save the busy slots
      busyStartTime = format(availablityResponse.busy[0].start, 'hh:mmaaa');
      busyEndTime = format(availablityResponse.busy[0].end, 'hh:mmaaa');

      //Return busy error
      throw new Error(`Room is busy from ${busyStartTime} to ${busyEndTime}`);
    }

    //Create the event now that we know the room is available
    const response = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: payload,
    });

    return response;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export default createEvent;
