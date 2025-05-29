import { gapi } from 'gapi-script';
import { getAvailabilityByCalendarId } from '../availability/getAvailability';
import { format } from 'date-fns';

//Payload: calendarId, summary, start, end, attendees
const updateEvent = async (payload) => {
  try {
    const resourceId = payload.attendees[0]?.email;

    // Get current event details
    const existingEvent = await gapi.client.calendar.events.get({
      calendarId: 'primary',
      eventId: payload.id,
    });

    //Retrieve start and end times
    const existingStart = existingEvent.result.start.dateTime;
    const existingEnd = existingEvent.result.end.dateTime;
    //Convert them into milliseconds
    const existingStartTime = new Date(existingStart).getTime();
    const existingEndTime = new Date(existingEnd).getTime();

    //Make sure resource is available before creating event
    const availablityResponse = await getAvailabilityByCalendarId(
      resourceId,
      payload.start.dateTime,
      payload.end.dateTime
    );

    // Filter out the already existing busy slot
    const filteredBusy = availablityResponse.busy.filter((slot) => {
      const busyStartTime = new Date(slot.start).getTime();
      const busyEndTime = new Date(slot.end).getTime();

      return !(
        busyStartTime === existingStartTime && busyEndTime === existingEndTime
      );
    });

    //If we have no busy slots other than the existing one, then the room is available
    const isAvailable = filteredBusy.length === 0;

    let busyStartTime = null;
    let busyEndTime = null;

    if (!isAvailable) {
      //If the room is not available, save the busy slots
      busyStartTime = format(availablityResponse.busy[0].start, 'hh:mmaaa');
      busyEndTime = format(availablityResponse.busy[0].end, 'hh:mmaaa');

      //Return busy message
      throw new Error(`Room is busy from ${busyStartTime} to ${busyEndTime}`);
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
    throw error;
  }
};

export default updateEvent;
