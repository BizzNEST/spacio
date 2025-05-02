import { useMemo } from 'react';

const useFilteredRooms = (rooms, selectedRoomType) => {
  return useMemo(() => {
    if (selectedRoomType === 'all') {
      return rooms;
    } else {
      return rooms.filter((room) => selectedRoomType === room.type);
    }
  }, [rooms, selectedRoomType]);
};

export default useFilteredRooms;
