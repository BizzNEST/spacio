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

// Check availability function
async function checkAvailability(date, startTime, endTime) {
  try {
    // Implement your availability checking logic here
    // For now, just return a dummy response
    console.log("Checking availability for:", date, startTime, endTime);
    
    // This should be replaced with actual availability checking logic
    return { success: true, message: "Availability checked" };
  } catch (error) {
    console.error("Error checking availability:", error);
    throw error;
  }
}

// Create booking function
async function createBooking(bookingDetails) {
  try {
    // Implement your booking creation logic here
    console.log("Creating booking:", bookingDetails);
    
    // This should be replaced with actual booking logic
    return { success: true, bookingId: "temp-" + Date.now() };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}



export { getAllRooms, checkAvailability,createBooking} 