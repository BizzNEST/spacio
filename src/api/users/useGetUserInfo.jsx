import { useQuery } from '@tanstack/react-query';
import getUserInfo from './getUserInfo';
import { useAuth } from '../../contexts/authContext';

const useGetUserInfo = () => {
  const { isUserLoggedIn, isGapiReady, accessToken } = useAuth();

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(accessToken),
    enabled: isUserLoggedIn && isGapiReady,
    retry: 2,
    refetchOnWindowFocus: false, // <- Keep this since we only need to fetch user info once
  });
};

export default useGetUserInfo;
