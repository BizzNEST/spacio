import { useState, useEffect } from 'react';
import getEvents from '../api/getEvents';
import useAuth from './useAuth';

const useFetchAllEvents = (calendars, rooms) => {
  const [events, setEvents] = useState([]);
  const { isAuthorized } = useAuth();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const allEvents = [];

      for (const calendar of calendars) {
        const calendarEvents = await getEvents(calendar.id);

        const matchedRoom = rooms.find((room) =>
          calendar.summary.includes(room.title)
        );

        if (matchedRoom) {
          const eventsWithResource = calendarEvents.map((event) => ({
            ...event,
            resourceId: matchedRoom.id,
          }));

          allEvents.push(...eventsWithResource);
        }
      }

      setEvents(allEvents);
    };

    if (isAuthorized && calendars.length > 0 && rooms.length > 0) {
      fetchAllEvents();
    }
  }, [calendars, rooms]); // make sure both are included

  return events;
};

export default useFetchAllEvents;
