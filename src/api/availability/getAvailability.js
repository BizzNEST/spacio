import { gapi } from 'gapi-script';
import { addMinutes, format } from 'date-fns';

export const getAvailability = async (calendar) => {
  const curTime = new Date();
  try {
    //Retrieve all the calendars from the user's calendar list
    const response = await gapi.client.calendar.freebusy.query({
      timeMin: curTime.toISOString(),
      timeMax: addMinutes(curTime, 30).toISOString(),
      timeZone: 'America/Los Angeles',
      items: [
        {
          id: calendar.id,
        },
      ],
    });

    const busyTimes = {
      timeMin: format(response.result.timeMin, 'hh:mm'),
      timeMax: format(response.result.timeMax, 'hh:mm'),
      id: calendar.id,
      busy: response.result.calendars[calendar.id].busy,
      title: calendar.title,
      location: calendar.location,
      capacity: calendar.capacity,
      floor: calendar.floor,
      //freeAgain: response.result.calendars[calendarId].busy[0].end || [],
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
      items: [
        {
          id: calendarId,
        },
      ],
    });

    const busyTimes = {
      timeMin: format(response.result.timeMin, 'hh:mm'),
      timeMax: format(response.result.timeMax, 'hh:mm'),
      id: calendarId,
      busy: response.result.calendars[calendarId].busy,
      //freeAgain: response.result.calendars[calendarId].busy[0].end || [],
    };

    return busyTimes;
  } catch (error) {
    console.error('Error fetching availablity:', error);
    return [];
  }
};
