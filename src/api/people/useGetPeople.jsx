import { useQuery } from '@tanstack/react-query';
import getPeople from './getPeople';
import { useAuth } from '../../contexts/authContext';

const useGetPeople = (calendars) => {
  const { isUserLoggedIn, isGapiReady } = useAuth();
  return useQuery({
    queryKey: ['people'],
    queryFn: getPeople,
    enabled: isUserLoggedIn && isGapiReady && !!calendars,
    retry: 2,
    refetchOnWindowFocus: false, // <- Keep this since we only need to fetch people once
  });
};

export default useGetPeople;
