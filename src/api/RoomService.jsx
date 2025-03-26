import { db } from './firebase'; // Import your configured Firebase instance
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';

async getAllRooms() {
  try {
    const roomsCollection = collection(db, 'rooms');
    const roomSnapshot = await getDocs(roomsCollection);
    return roomSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting rooms:", error);
    throw error;
  }
}


export default new RoomService();
