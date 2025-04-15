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
        console.log('User is authenticated:', user);
        setIsAuthorized(true);
      } else {
        console.log('User is NOT authenticated');
        setIsAuthorized(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    console.log('inside of handle sign in');

    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    const credential = GoogleAuthProvider.credential(token);

    await signInWithCredential(auth, credential).then(async () => {
      setIsAuthorized(true);
    });
  };

  // ✅ Sign Out
  const handleSignOut = async (navigate) => {
    try {
      setIsLoading(true);
      const googleAuth = gapi.auth2.getAuthInstance();

      if (googleAuth) {
        const user = googleAuth.currentUser.get();

        if (user && user.isSignedIn()) {
          const token = user.getAuthResponse().id_token;

          if (token) {
            try {
              await fetch(
                `https://accounts.google.com/o/oauth2/revoke?token=${token}`,
                {
                  method: 'GET',
                  mode: 'no-cors',
                }
              );
            } catch (error) {
              console.error('Error revoking token:', error);
            }
          }

          await googleAuth.signOut();
          await googleAuth.disconnect();
        } else {
          console.warn('User is already signed out from Google.');
        }
      } else {
        console.warn(
          'Google Auth instance not found. Proceeding with Firebase logout...'
        );
      }

      await signOut(auth);
      setIsAuthorized(false);
      setIsLoading(false);

      if (navigate) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during sign-out process:', error);
    }
  };

  return { handleSignIn, handleSignOut, isAuthorized, isLoading, events };
};

export default useAuth;
