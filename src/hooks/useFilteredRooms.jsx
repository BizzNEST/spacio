import { useState, useEffect } from 'react';

const useFilteredRooms = (rooms, selectedRoomTypes) => {
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  useEffect(() => {
    if (selectedRoomTypes.includes('all')) {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(
        rooms.filter((room) => selectedRoomTypes.includes(room.type))
      );
    }
  }, [rooms, selectedRoomTypes]);

  return filteredRooms;
};

export default useFilteredRooms;
