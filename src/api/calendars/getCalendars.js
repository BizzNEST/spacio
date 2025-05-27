import { gapi } from 'gapi-script';
import {
  getResourceCapacity,
  getResourceFloor,
  getResourceLocation,
  getTrimmedName,
  isResourceCalendar,
} from './helpers';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

const getCalendars = async () => {
  try {
    // //Retrieve all the calendars from the user's calendar list
    // const response = await gapi.client.calendar.calendarList.list();
    // const calendarItems = response.result.items;

    // //Finally, return an array of calendars with the parameters we want for convenience
    // const calendars = calendarItems.map((calendar, index) => {
    //   const color = CALENDAR_COLORS[index % CALENDAR_COLORS.length];

    const querySnapshot = await getDocs(collection(db, 'rooms'));
    const documents = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      documents.push({ id: doc.id, ...doc.data() });
    });

    console.log('DOCS: ', documents);
    return documents;

    //   return {
    //     id: doc.resourceEmail,
    //     title: getTrimmedName(calendar.summary),
    //     capacity: getResourceCapacity(calendar.summary),
    //     floor: getResourceFloor(calendar.summary),
    //     primary: calendar.primary || false,
    //     backgroundColor: color.backgroundColor,
    //     foregroundColor: color.foregroundColor,
    //     location: getResourceLocation(calendar.summary),
    //   };
    // });

    //Filter to only include resource calendars
    return calendars.filter(isResourceCalendar);
  } catch (error) {
    console.error('Error fetching calendar list:', error);
    return [];
  }
};

const CALENDAR_COLORS = [
  { backgroundColor: '#C60077', foregroundColor: '#ffffff' }, // yellow
  { backgroundColor: '#33A852', foregroundColor: '#ffffff' }, // green
  { backgroundColor: '#3371A8', foregroundColor: '#ffffff' }, // blue
  { backgroundColor: '#d50000', foregroundColor: '#ffffff' }, // red
  { backgroundColor: '#9D16BC', foregroundColor: '#ffffff' }, // purple
];

export default getCalendars;
