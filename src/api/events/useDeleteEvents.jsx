import { useMutation, useQueryClient } from '@tanstack/react-query'
import deleteEvent from './deleteEvent'
function useDeleteEvent() {

const queryClient = useQueryClient()

return useMutation({
  mutationFn: (eventId) => deleteEvent(eventId), 
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['events'] })
  },
})
}
export default useDeleteEvent;