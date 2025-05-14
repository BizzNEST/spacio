import { useMutation, useQueryClient } from '@tanstack/react-query';
import createEvent from './createEvent';

const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEvent) => createEvent(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      console.log('Error Creating Event', error);
    },
  });
};

export default useCreateEvent;
