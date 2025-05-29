import { useQueries } from '@tanstack/react-query';
import getEvents from './getEvents';
import { useAuth } from '../../contexts/authContext';

export const useFetchAllEvents = (calendars = [], people) => {
  const { isUserLoggedIn, isGapiReady, userInfo } = useAuth();

  const queryResults = useQueries({
    queries: calendars.map((calendar) => ({
      queryKey: ['events', calendar.id],
      queryFn: () => getEvents(calendar.id, userInfo, people),
      enabled:
        isUserLoggedIn && isGapiReady && !!calendar && !!userInfo && !!people,
      refetchOnWindowFocus: false, // <-- NOTE: Remove this once ready for production
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
