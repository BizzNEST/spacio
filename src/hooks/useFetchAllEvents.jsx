import { useEffect } from 'react';
import getEvents from '../api/getEvents';
import useAuth from './useAuth';

const useFetchAllEvents = (calendars, rooms) => {
  const { isAuthorized } = useAuth();

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        //Start of with empty event array
        const allEvents = [];

        //For each calendar in the calendars array that was passed in
        for (const calendar of calendars) {
          //Get the events asscoiated with that calendar
          const calendarEvents = await getEvents(calendar.id);

          //Find any rooms that the calendar is associated with (if any)
          const matchedRoom = rooms.find((room) =>
            calendar.summary.includes(room.title)
          );

          //If there is a matched room, then append the match rooms id to each event
          if (matchedRoom) {
            const eventsWithResource = calendarEvents.map((event) => ({
              ...event,
              resourceId: matchedRoom.id,
            }));

            //Append the eventsWithResource to the allEvents array
            allEvents.push(...eventsWithResource);
          }
        }

        console.log('All events:', allEvents);
        return allEvents;
      } catch (error) {
        console.error('Error fetching all events:', error);
      }
    };

    if (isAuthorized && calendars.length > 0 && rooms.length > 0) {
      fetchAllEvents();
    }
  }, [calendars, rooms]);
};

export default useFetchAllEvents;
