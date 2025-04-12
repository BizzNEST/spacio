import { gapi } from 'gapi-script';

const getCalendars = async () => {
  try {
    const response = await gapi.client.calendar.calendarList.list();
    const calendars = response.result.items.map((calendar) => ({
      id: calendar.id,
      summary: calendar.summary,
      primary: calendar.primary || false,
    }));
    console.log(calendars);
    return calendars;
  } catch (error) {
    console.error('Error fetching calendar list:', error);
    return [];
  }
};

export default getCalendars;
