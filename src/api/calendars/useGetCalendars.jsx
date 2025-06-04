import { useQuery } from '@tanstack/react-query';
import getCalendars from './getCalendars';
import { useAuth } from '../../contexts/authContext';

const useGetCalendars = () => {
  const { isUserLoggedIn, isGapiReady } = useAuth();
  return useQuery({
    queryKey: ['calendars'],
    queryFn: getCalendars,
    enabled: isUserLoggedIn && isGapiReady,
    retry: 2,
    refetchOnWindowFocus: false, //<- Keep this since we only need to fetch calendars once
  });
};

export default useGetCalendars;
