import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { initClient } from '../api/gapi';
import { auth } from '../api/firebase.config';
import {
  GoogleAuthProvider,
  signOut,
  signInWithCredential,
  onAuthStateChanged,
} from 'firebase/auth';

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
        setIsAuthorized(true);
        loadEvents();
      } else {
        console.log("User is NOT authenticated");
        setIsAuthorized(false);
        setEvents([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
  
      const items = response.result?.items || [];
      setEvents([...items]);
  
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignIn = async () => {
    console.log('inside of handle sign in');
    
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    const credential = GoogleAuthProvider.credential(token);

    await signInWithCredential(auth, credential).then(async () => {
      setIsAuthorized(true);
      await loadEvents();
    });
  };

  // ✅ Sign Out
  const handleSignOut = async (navigate) => {
    try {
      setIsLoading(true);
      console.log("Inside handleSignOut...");
  
      const googleAuth = gapi.auth2.getAuthInstance();
      
      if (googleAuth) {
        const user = googleAuth.currentUser.get();
        
        if (user && user.isSignedIn()) {
          console.log("User is signed in, revoking token...");
          const token = user.getAuthResponse().id_token;
  
          if (token) {
            try {
              await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`, {
                method: "GET",
                mode: "no-cors",
              });
              console.log("Token revoked successfully.");
            } catch (error) {
              console.warn("Token revocation failed. Continuing logout...");
            }
          }
  
          await googleAuth.signOut();
          await googleAuth.disconnect();
        } else {
          console.warn("User is already signed out from Google.");
        }
      } else {
        console.warn("Google Auth instance not found. Proceeding with Firebase logout...");
      }
  
      await signOut(auth);
      console.log("Signed out from Firebase");
  
      setIsAuthorized(false);
      setEvents([]);
      setIsLoading(false);
  
      if (navigate) {
        navigate('/login');
      }
  
    } catch (error) {
      console.error("Error during sign-out process:", error);
    }
  };
  
  return { handleSignIn, handleSignOut, isAuthorized, isLoading, events };
};

export default useAuth;