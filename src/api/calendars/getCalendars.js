import { gapi } from 'gapi-script';
import {
  getResourceCapacity,
  getResourceFloor,
  getResourceLocation,
  getTrimmedName,
  isResourceCalendar,
} from './helpers';

const getCalendars = async () => {
  try {
    //Retrieve all the calendars from the user's calendar list
    const response = await gapi.client.calendar.calendarList.list();

    //Return an array of calendars with the parameters we want
    const calendars = response.result.items.map((calendar) => ({
      id: calendar.id,
      colorId: calendar.colorId,
      title: getTrimmedName(calendar.summary),
      capacity: getResourceCapacity(calendar.summary),
      floor: getResourceFloor(calendar.summary),
      primary: calendar.primary || false,
      location: getResourceLocation(calendar.summary),
    }));

    //Filter to only include resource calendars
    return calendars.filter(isResourceCalendar);
  } catch (error) {
    console.error('Error fetching calendar list:', error);
    return [];
  }
};

export default getCalendars;
