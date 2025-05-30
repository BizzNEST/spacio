import { useQueries } from '@tanstack/react-query';
import { useAuth } from '../../contexts/authContext';
import { calendarToRoomMap } from '../../helpers/calendarToRoomMap';
import { getAvailability } from './getAvailability';

const ONE_MINUTE = 60000;

export const useGetAvailability = (calendars = []) => {
  const { isUserLoggedIn, isGapiReady } = useAuth();

  const isBusy = useQueries({
    queries: calendars.map((calendar) => ({
      queryKey: ['available', calendar.id],
      queryFn: () => getAvailability(calendar),
      enabled: isUserLoggedIn && isGapiReady && !!calendar,
      refetchInterval: ONE_MINUTE,
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
