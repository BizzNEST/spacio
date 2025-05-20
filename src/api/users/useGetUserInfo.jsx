import { useQuery } from '@tanstack/react-query';
import getUserInfo from './getUserInfo';
import { useAuth } from '../../contexts/authContext';

const useGetUserInfo = () => {
  const { isUserLoggedIn, isGapiReady, accessToken } = useAuth();
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo(accessToken),
    enabled: isUserLoggedIn && isGapiReady,
    retry: 2,
    refetchOnWindowFocus: false, // <-- NOTE: Remove this once ready for production
  });
};

export default useGetUserInfo;
