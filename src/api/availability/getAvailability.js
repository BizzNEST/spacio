import { gapi } from 'gapi-script';
import { addMinutes, format } from 'date-fns';

const getAvailability = async (calendarId = 'primary', summary = 'name') => {
  //console.log('Got heree');
  const curTime = new Date();
  try {
    //Retrieve all the calendars from the user's calendar list
    const response = await gapi.client.calendar.freebusy.query({
      timeMin: curTime.toISOString(),
      timeMax: addMinutes(curTime, 30).toISOString(),
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
      calendarId: calendarId,
      busy: response.result.calendars[calendarId].busy,
      summary: summary,
      //freeAgain: response.result.calendars[calendarId].busy[0].end || [],
    };
    //console.log('Response', response);

    return busyTimes;
  } catch (error) {
    console.error('Error fetching availablity:', error);
    return [];
  }
};

export default getAvailability;
