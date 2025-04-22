import { useQuery } from '@tanstack/react-query';
import getCalendars from '../api/getCalendars';
import { useAuth } from '../contexts/authContext';

const useGetCalendars = (rooms) => {
  const { isUserLoggedIn, isGapiReady } = useAuth();
  return useQuery({
    queryKey: ['calendars', rooms],
    queryFn: async () => {
      const allCalendars = await getCalendars();
      return allCalendars.filter((calendar) =>
        rooms.some((room) => calendar.summary.includes(room.title))
      );
    },
    enabled: isUserLoggedIn && isGapiReady,
    retry: 2,
  });
};

export default useGetCalendars;
