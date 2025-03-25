import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Get all rooms
export const getAllRooms = async () => {
    const roomsRef = collection(db, "rooms");
    const roomsSnapshot = await getDocs(roomsRef);
    return roomsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };
  
  // Get a specific room by ID
  export const getRoomById = async (roomId) => {
    const roomRef = doc(db, "rooms", roomId);
    const roomSnapshot = await getDoc(roomRef);
    
    if (roomSnapshot.exists()) {
      return {
        id: roomSnapshot.id,
        ...roomSnapshot.data()
      };
    } else {
      return null;
    }
  };
   

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    FIREBASE_CONFIGURATION
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

