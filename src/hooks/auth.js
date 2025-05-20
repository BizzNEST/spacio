import { googleLogout } from '@react-oauth/google';

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expires_at');
  return googleLogout();
};
