import { useMemo } from 'react';

const useFilterResourceByFloor = (resources, filterType) => {
  return useMemo(() => {
    if (filterType === 'all') {
      return resources;
    } else {
      const rooms = resources.filter(
        (resource) => Number(filterType) === resource.floor
      );

      if (rooms.length > 0) {
        return rooms;
      } else {
        return resources;
      }
    }
  }, [resources, filterType]);
};

export default useFilterResourceByFloor;
