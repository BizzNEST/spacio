const CAPACITY_REGEX = /\((\d{1,2})\)/;
const FLOOR_REGEX = /-(\d)-/;
const NAME_REGEX = /-(?!\d-)([^-()]+?)(?=\s*\(|$)/;

/**
 * Given a room name, returns the capacity of the room if present, otherwise
 * returns null. The capacity is expected to be in the format "(X)" where X is
 * the number of seats available.
 *
 * @param {String} roomName - The name of the room
 * @return {String|null} - The capacity of the room, or null if not present
 */
export const getResourceCapacity = (roomName) => {
  if (!roomName) {
    return;
  }

  const capacity = roomName.match(CAPACITY_REGEX);

  if (capacity && capacity[1]) {
    return capacity[1];
  }

  return null;
};

/**
 * Given a floor name, returns the floor number if present, otherwise
 * returns null. The floor number is expected to be in the format "-X-"
 * where X is the floor number.
 *
 * @param {String} floorName - The name of the floor
 * @return {String|null} - The floor number of the room, or null if not present
 */
export const getResourceFloor = (floorName) => {
  if (!floorName) {
    return;
  }
  const floor = floorName.match(FLOOR_REGEX);
  if (floor && floor[1]) {
    return floor[1];
  }
  return null;
};
/**
 * Extracts and returns the trimmed name from a given string.
 * The name is expected to follow a specific pattern where it appears
 * after a hyphen and before any parentheses, or at the end of the string.
 *
 * @param {String} trimmedName - The string to extract the name from
 * @return {String|null} - The extracted name, or null if not found
 */

export const getTrimmedName = (trimmedName) => {
  if (!trimmedName) {
    return;
  }
  const name = trimmedName.match(NAME_REGEX);

  if (name && name[1]) {
    return name[1];
  }
  return null;
};

/**
 * Checks if the given calendar is a resource calendar.
 *
 * @param {Object} calendar - The calendar object
 * @return {Boolean} - True if the calendar is a resource calendar, false otherwise
 */
export const isResourceCalendar = (calendar) => {
  return calendar.id.includes('resource.calendar.google.com');
};
