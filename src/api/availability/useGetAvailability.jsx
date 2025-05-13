import { useQueries } from '@tanstack/react-query';
import { useAuth } from '../../contexts/authContext';
import { calendarToRoomMap } from '../../helpers/calendarToRoomMap';
import getAvailability from './getAvailability';

const isResourceCalendar = (calendar) => {
  return (
    calendar.resourceType === 'room' ||
    calendar.id.includes('resource.calendar.google.com') ||
    calendarToRoomMap[calendar.id] != null // If it exists in your room mapping
  );
};

export const useGetAvailability = (calendars = []) => {
  const { isUserLoggedIn, isGapiReady } = useAuth();

  //console.log('calendars:', calendars, 'type:', typeof calendars);

  // Filter to only include resource calendars
  const resourceCalendars = calendars.filter(isResourceCalendar);

  //console.log('RESOURCE CAL: ', resourceCalendars);

  const isBusy = useQueries({
    queries: resourceCalendars.map((calendar) => ({
      queryKey: ['available', calendar.id],
      queryFn: () => getAvailability(calendar.id, calendar.summary),
      enabled: isUserLoggedIn && isGapiReady && !!calendar,
      // refetchOnWindowFocus: false,
    })),
  });

  // Process the results to create a flat array of all events
  const allAvailabilites = isBusy
    .filter((result) => result.data) // Filter out any undefined results
    .flatMap((result) => result.data); // Flatten the events from all calendars

  // Check if any of the queries are still loading
  const isLoading = isBusy.some((result) => result.isLoading);

  // Check if any of the queries have errors
  const isError = isBusy.some((result) => result.isError);
  const error = isBusy.find((result) => result.error)?.error;

  return {
    data: allAvailabilites,
    isLoading,
    isError,
    error,
  };
};
