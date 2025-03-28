import { db } from './firebase.config';
import { collection, getDocs } from 'firebase/firestore';

// Get all rooms function
async function getAllRooms() {
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

async function checkAvailability(date, startTime, endTime) {
  try {
    console.log("Checking availability for:", date, startTime, endTime);
    
    return { success: true, message: "Availability checked" };
  } catch (error) {
    console.error("Error checking availability:", error);
    throw error;
  }
}

async function createBooking(bookingDetails) {
  try {
    console.log("Creating booking:", bookingDetails);
    
    return { success: true, bookingId: "temp-" + Date.now() };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}



export { getAllRooms, checkAvailability,createBooking} 