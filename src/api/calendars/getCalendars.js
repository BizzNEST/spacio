import { gapi } from 'gapi-script';
const CAPACITY_REGEX = /\((\d{1,2})\)/;
const FLOOR_REGEX = /-(\d)-/;
const NAME_REGEX = /-(?!\d-)([^-()]+?)(?=\s*\(|$)/; 

const getResourceCapacity = (roomName) => {
  if (!roomName) {
    return
  }

  const capacity = roomName.match(CAPACITY_REGEX)

  if (capacity && capacity[1]) {
    return capacity[1];
  } 

  return null;
}

const getResourceFloor = (floorName) => {
  if (!floorName) {
    return 
  }
  const floor = floorName.match(FLOOR_REGEX)
  if (floor && floor[1]) { 
    return floor[1];
  }
return null 

}
const getTrimmedName = (trimmedName) => {
  if (!trimmedName) {
    return 
  }
  const name = trimmedName.match(NAME_REGEX)

  if (name && name[1]) {
    return name[1];
  }
  return null;
}


const getCalendars = async () => {
  try {
    //Retrieve all the calendars from the user's calendar list
    const response = await gapi.client.calendar.calendarList.list();

    //Return an array of calendars with the parameters we want
    const calendars = response.result.items.map((calendar) => ({
      id: calendar.id,
      location: calendar.location,
      colorId: calendar.colorId,
      title: getTrimmedName(calendar.summary),
      capacity: getResourceCapacity(calendar.summary),
      floor: getResourceFloor(calendar.summary),
      

      primary: calendar.primary || false,
    }));
    console.log(calendars)
    return calendars;
  } catch (error) {
    console.error('Error fetching calendar list:', error);
    return [];
  }
};

export default getCalendars;
