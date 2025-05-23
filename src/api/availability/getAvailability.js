import { gapi } from 'gapi-script';
import { addMinutes, differenceInMinutes, format } from 'date-fns';

export const getAvailability = async (calendar) => {
  const curTime = new Date();
  try {
    //Retrieve all the calendars from the user's calendar list
    const response = await gapi.client.calendar.freebusy.query({
      timeMin: curTime.toISOString(),
      timeMax: addMinutes(curTime, 30).toISOString(),
      timeZone: 'America/Los Angeles',
      items: [{ id: calendar.id }],
    });

    const isAvailable =
      response.result.calendars[calendar.id].busy.length === 0;

    let busyStartTime =
      response.result.calendars[calendar.id].busy[0]?.start || null;
    let busyEndTime =
      response.result.calendars[calendar.id].busy[0]?.end || null;
    let nextAvailableTime = null;
    let timeBeforeBusy = null;
     let isBusySoon =
      (differenceInMinutes(busyStartTime, curTime) < 30 &&
        differenceInMinutes(busyStartTime, curTime) > 15) && !isAvailable ||
      false;
      console.log("isBusySoon", isBusySoon)

    if (!isAvailable) {
      //If the room is not available, store the busy slots
      busyStartTime = format(
        response.result.calendars[calendar.id].busy[0].start,
        'hh:mmaaa'
      );
      busyEndTime = format(
        response.result.calendars[calendar.id].busy[0].end,
        'hh:mmaaa'
      );

      nextAvailableTime = differenceInMinutes(
        response.result.calendars[calendar.id].busy[0].end,
        curTime
      );

      timeBeforeBusy = differenceInMinutes(
        response.result.calendars[calendar.id].busy[0].start,
        curTime
      );
    }

    const busyTimes = {
      timeMin: format(response.result.timeMin, 'hh:mm'),
      timeMax: format(response.result.timeMax, 'hh:mm'),
      id: calendar.id,
      busy: response.result.calendars[calendar.id].busy,
      title: calendar.title,
      location: calendar.location,
      capacity: calendar.capacity,
      floor: calendar.floor,
      busyStartTime,
      busyEndTime,
      isAvailable,
      nextAvailableTimeInMinutes: nextAvailableTime,
      timeBeforeBusyInMinutes: timeBeforeBusy,
      isBusySoon
    };

    return busyTimes;
  } catch (error) {
    console.error('Error fetching availablity:', error);
    return [];
  }
};

export const getAvailabilityByCalendarId = async (
  calendarId,
  startTime,
  endTime
) => {
  try {
    const response = await gapi.client.calendar.freebusy.query({
      timeMin: startTime,
      timeMax: endTime,
      timeZone: 'America/Los Angeles',
      items: [{ id: calendarId }],
    });

    const busyTimes = {
      timeMin: format(response.result.timeMin, 'hh:mm'),
      timeMax: format(response.result.timeMax, 'hh:mm'),
      id: calendarId,
      busy: response.result.calendars[calendarId].busy,
    };

    return busyTimes;
  } catch (error) {
    console.error('Error fetching availablity:', error);
    return [];
  }
};
