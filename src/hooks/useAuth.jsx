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

    await signInWithCredential(auth, credential).then(() => {
      setIsAuthorized(true);
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

  const loadEvents = () => {
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      })
      .then((response) => {
        setEvents(response.result.items);
      });
  };

  return { handleSignIn, handleSignOut, isAuthorized, events };
};

export default useAuth;
