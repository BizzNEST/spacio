import { useMutation } from '@tanstack/react-query';

const refreshToken = async () => {
  const response = await fetch(
    'http://localhost:4002/auth/google/refresh-token',
    {
      method: 'POST',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  return response.json();
};

export default function useRefreshToken() {
  return useMutation({
    mutationFn: refreshToken,
  });
}
