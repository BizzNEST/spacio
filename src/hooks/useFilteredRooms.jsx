import { useMemo } from 'react';

const useFilterResourceByFloor = (resources, filterType) => {
  return useMemo(() => {
    if (filterType === 'all') {
      return resources;
    } else {
      return resources.filter(
        (resource) => Number(filterType) === resource.floor
      );
    }
  }, [resources, filterType]);
};

export default useFilterResourceByFloor;
