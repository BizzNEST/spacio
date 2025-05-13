import { useMutation, useQueryClient } from '@tanstack/react-query';
import createEvents from './createEvent';

const useCreateEvent = () => {
  console.log('Here');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent) => createEvents(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      console.log('Error Creating Event', error);
    },
  });
};

export default useCreateEvent;
