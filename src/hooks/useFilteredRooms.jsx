import { useMemo } from 'react';

const useFilteredRooms = (rooms, selectedRoomTypes) => {
  return useMemo(() => {
    if (selectedRoomTypes.includes('all')) {
      return rooms;
    } else {
      return rooms.filter((room) => selectedRoomTypes.includes(room.type));
    }
  }, [rooms, selectedRoomTypes]);
};

export default useFilteredRooms;
