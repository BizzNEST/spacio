import { useQuery } from '@tanstack/react-query';
import getEvents from './getEvents';
import { useAuth } from '../../contexts/authContext';

const fetchAllEvents = async (calendars, rooms) => {
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

  return allEvents;
};

export const useFetchAllEvents = (calendars, rooms) => {
  const { isUserLoggedIn, isGapiReady } = useAuth();

  return useQuery({
    queryKey: ['events'],
    queryFn: () => fetchAllEvents(calendars, rooms),
    enabled: isUserLoggedIn && isGapiReady,
    //Refetch every 5 minutes
    staleTime: 1000 * 60 * 5,
  });
};
