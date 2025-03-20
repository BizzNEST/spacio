import { ref, set, push } from 'firebase/database';
import { db } from '../firebase.config';

export function writeUserData(formData) {
  const newUserRef = push(ref(db, 'events'));
  set(newUserRef, formData) // ✅ Store each event with a unique timestamp
    .then(() => console.log('Event saved successfully!'))
    .catch((error) => console.error('Error saving event:', error));
}
