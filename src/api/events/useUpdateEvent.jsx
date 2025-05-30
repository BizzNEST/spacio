import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateEvent from './updateEvent';

const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedEvent) => updateEvent(updatedEvent),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['events'] });
      }, 8000);
    },
    onError: (error) => {
      console.log('Error Creating Event', error);
    },
  });
};

export default useUpdateEvent;
