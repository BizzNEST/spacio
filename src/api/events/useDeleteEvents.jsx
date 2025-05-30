import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteEvent from './deleteEvent';
function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId }) => deleteEvent(eventId),
    onSuccess: (_data, variables) => {
      const resourceId = variables?.resourceId;

      if (resourceId) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['events', resourceId] });
        }, 8000);
      }
    },
  });
}
export default useDeleteEvent;
