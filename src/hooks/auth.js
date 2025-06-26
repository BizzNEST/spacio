import { googleLogout } from '@react-oauth/google';

export const signOut = async () => {
  try {
    await fetch('http://localhost:4002/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.log(error, 'Failed to logout');
  }

  localStorage.removeItem('token');
  localStorage.removeItem('expires_at');
  googleLogout();
};
