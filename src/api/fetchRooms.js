import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase.config';

async function fetchRooms(location) {
  console.log(location);
  //const queryDocuments = await getDocs(collection(db, 'rooms'));
  const locationQuery = query(
    collection(db, 'rooms'),
    where('location', '==', location)
  );
  console.log(locationQuery);
  const roomsSnapshot = await getDocs(locationQuery);
  const rooms = roomsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return rooms;
}
export default fetchRooms;
