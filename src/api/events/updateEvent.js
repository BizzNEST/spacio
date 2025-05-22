import { gapi } from 'gapi-script';
import { getAvailabilityByCalendarId } from '../availability/getAvailability';
import { format } from 'date-fns';

//Payload: calendarId, summary, start, end, attendees
const updateEvent = async (payload) => {
  try {
    const resourceId = payload.attendees[0]?.email;

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

      //Return busy message
      return {
        success: false,
        message: `This room is busy from ${busyStartTime} to ${busyEndTime}`,
        busySlots: availablityResponse.busy,
        busyStartTime,
        busyEndTime,
      };
    }

    //Update the event now that we know the room is available
    const response = await gapi.client.calendar.events.patch({
      calendarId: 'primary',
      eventId: payload.id,
      resource: payload,
    });

    return response;
  } catch (error) {
    console.error('Error updating event:', error);
    return [];
  }
};

export default updateEvent;
