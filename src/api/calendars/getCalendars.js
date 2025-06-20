import { gapi } from 'gapi-script';
import { getTrimmedName } from './helpers';

const getCalendars = async () => {
  try {
    //fetch from org resources
    const response = await gapi.client.directory.resources.calendars.list({
      customer: 'my_customer',
    });

    //get resources from call response
    const resources = response.result.items;

    const calendars = resources.map((calendar, index) => {
      const color = CALENDAR_COLORS[index % CALENDAR_COLORS.length];

      return {
        id: calendar.resourceEmail,
        title: calendar.resourceName,
        capacity: calendar.capacity,
        floor: Number(calendar.floorName),
        backgroundColor: color.backgroundColor,
        foregroundColor: color.foregroundColor,
        location: getTrimmedName(calendar.buildingId) ?? calendar.buildingId,
      };
    });

    return calendars;
  } catch (error) {
    console.error('Error fetching calendar list:', error);
    return [];
  }
};

const CALENDAR_COLORS = [
  { backgroundColor: '#C60077', foregroundColor: '#ffffff' }, // yellow
  { backgroundColor: '#33A852', foregroundColor: '#ffffff' }, // green
  { backgroundColor: '#3371A8', foregroundColor: '#ffffff' }, // blue
  { backgroundColor: '#d50000', foregroundColor: '#ffffff' }, // red
  { backgroundColor: '#9D16BC', foregroundColor: '#ffffff' }, // purple
];

export default getCalendars;
