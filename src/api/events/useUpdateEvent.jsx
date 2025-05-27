import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateEvent from './updateEvent';

const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedEvent) => updateEvent(updatedEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      console.log('Error Creating Event', error);
    },
  });
};

export default useUpdateEvent;
