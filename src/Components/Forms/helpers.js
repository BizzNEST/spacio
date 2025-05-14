import { addMinutes, setSeconds, setMilliseconds } from 'date-fns';
/**
 * Rounds up the given Date object to the nearest 15-minute interval.
 *
 * If the given Date object is already on a 15-minute interval, it is not modified.
 *
 * @param {Date} date - The Date object to be rounded up.
 * @return {Date} A new Date object that has been rounded up to the nearest 15-minute interval.
 */
export function roundUpToNext15(date) {
  const minutes = date.getMinutes();
  const remainder = minutes % 15;
  const minutesToAdd = remainder === 0 ? 0 : 15 - remainder;

  let rounded = addMinutes(date, minutesToAdd);
  rounded = setSeconds(rounded, 0);
  rounded = setMilliseconds(rounded, 0);

  return rounded;
}

/**
 * Combine a Date object containing only a date part with a Date object
 * containing only a time part into a single Date object containing both.
 *
 * @param {Date} datePart - A Date object containing only a date part.
 * @param {Date} timePart - A Date object containing only a time part.
 * @return {Date} A new Date object containing both date and time parts.
 */
export function combineDateAndTime(datePart, timePart) {
  const combined = new Date(datePart);
  combined.setHours(timePart.getHours());
  combined.setMinutes(timePart.getMinutes());
  combined.setSeconds(0);
  combined.setMilliseconds(0);
  return combined;
}
