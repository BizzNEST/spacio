import { db } from './firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const getEvents = async () => {
  const q = collection(db, 'events');
  const querySnapshot = await getDocs(q);

  const events = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      title: data.title,
      start: data.start_time ? data.start_time.toDate() : new Date(), // Convert Firestore Timestamp
      end: data.end_time ? data.end_time.toDate() : new Date(),
    };
  });

  return events;
};

export default getEvents;
