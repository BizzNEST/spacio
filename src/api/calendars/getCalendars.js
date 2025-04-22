import { gapi } from 'gapi-script';

const getCalendars = async () => {
  try {
    //Retrieve all the calendars from the user's calendar list
    const response = await gapi.client.calendar.calendarList.list();

    //Return an array of calendars with the parameters we want
    const calendars = response.result.items.map((calendar) => ({
      id: calendar.id,

      summary: calendar.summary,
      primary: calendar.primary || false,
    }));
    return calendars;
  } catch (error) {
    console.error('Error fetching calendar list:', error);
    return [];
  }
};

export default getCalendars;
