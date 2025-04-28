import { useQueries } from '@tanstack/react-query';
import getEvents from './getEvents';
import { useAuth } from '../../contexts/authContext';
import { calendarToRoomMap } from '../../helpers/calendarToRoomMap';

const isResourceCalendar = (calendar) => {
  return (
    calendar.resourceType === 'room' ||
    calendar.id.includes('resource.calendar.google.com') ||
    calendarToRoomMap[calendar.id] != null // If it exists in your room mapping
  );
};

export const useFetchAllEvents = (calendars = []) => {
  const { isUserLoggedIn, isGapiReady } = useAuth();

  // Filter to only include resource calendars
  const resourceCalendars = calendars.filter(isResourceCalendar);

  const queryResults = useQueries({
    queries: resourceCalendars.map((calendar) => ({
      queryKey: ['events', calendar.id],
      queryFn: () => getEvents(calendar.id),
      enabled: isUserLoggedIn && isGapiReady && !!calendar,
      refetchOnWindowFocus: false,
    })),
  });

  // Process the results to create a flat array of all events
  const allEvents = queryResults
    .filter((result) => result.data) // Filter out any undefined results
    .flatMap((result) => result.data); // Flatten the events from all calendars

  // Check if any of the queries are still loading
  const isLoading = queryResults.some((result) => result.isLoading);

  // Check if any of the queries have errors
  const isError = queryResults.some((result) => result.isError);
  const error = queryResults.find((result) => result.error)?.error;

  return {
    data: allEvents,
    isLoading,
    isError,
    error,
  };
};
