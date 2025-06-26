import { useMutation } from '@tanstack/react-query';

const getToken = async (code) => {
  const response = await fetch('http://localhost:4002/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange auth code');
  }

  return response.json();
};

export default function useGetToken() {
  return useMutation({
    mutationFn: getToken,
  });
}
