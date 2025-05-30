import { useMutation, useQueryClient } from '@tanstack/react-query';
import createEvent from './createEvent';

const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEvent) => createEvent(newEvent),
    onSuccess: (_data, variables) => {
      const resourceId = variables?.attendees?.[0]?.email;

      if (resourceId) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['events', resourceId] });
        }, 8000);
      }
    },
    onError: (error) => {
      console.log('Error Creating Event', error);
    },
  });
};

export default useCreateEvent;
