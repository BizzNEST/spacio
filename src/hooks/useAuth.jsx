import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script'; //Import the Google API client
import { initClient } from '../api/gapi';
import { auth } from '../api/firebase.config';
import {
  GoogleAuthProvider,
  signOut,
  signInWithCredential,
} from 'firebase/auth';

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [events, setEvents] = useState([]);

  // Initialize the Google API client
  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  // Sign in and authorize the app
  const handleSignIn = async () => {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    const credential = GoogleAuthProvider.credential(token);

    await signInWithCredential(auth, credential).then(async () => {
      setIsAuthorized(true);
      await addEvent();
      loadEvents();
    });
  };

  // Sign out of the app
  const handleSignOut = async () => {
    await signOut(auth).then(() => {
      setIsAuthorized(false);
      setEvents([]);
    });
  };

  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const loadEvents = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      setEvents([...response.result.items]);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false); // Stop loading after events are fetched
    }
  };

  const addEvent = async () => {
    return new Promise((resolve, reject) => {
      const event = {
        summary: 'Google I/O 2025',
        location: '800 Howard St., San Francisco, CA 94103',
        description: "A chance to hear more about Google's developer products.",
        start: {
          dateTime: '2025-03-06T09:00:00-07:00',
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: '2025-03-06T17:00:00-07:00',
          timeZone: 'America/Los_Angeles',
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };

      gapi.client.calendar.events
        .insert({
          calendarId: 'primary',
          resource: event,
        })
        .execute((event) => {
          if (event && event.id) {
            resolve(event);
          } else {
            reject('Failed to add event');
          }
        });
    });
  };

  return { handleSignIn, handleSignOut, isAuthorized, isLoading, events };
};

export default useAuth;
