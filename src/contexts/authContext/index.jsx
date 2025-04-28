import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../api/firebase.config';
import { gapi } from 'gapi-script';
import PropTypes from 'prop-types';

//Create the context
const AuthContext = React.createContext();

//Import environment variables
const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;
const scope = import.meta.env.VITE_SCOPE;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [isGapiReady, setIsGapiReady] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return unsubscribe;
  }, []);

  async function initializeGapi() {
    try {
      await new Promise((resolve) => gapi.load('client:auth2', resolve));
      await gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope,
      });
      setIsGapiReady(true);
    } catch (error) {
      console.error('Failed to initialize Google API:', error);
      setIsGapiReady(false);
    }
  }

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setIsUserLoggedIn(true);

      try {
        await initializeGapi();
        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        if (!isSignedIn) {
          await gapi.auth2.getAuthInstance().signIn();
        }
      } catch (error) {
        console.error('Error during GAPI auth:', error);
      }
    } else {
      setCurrentUser(null);
      setIsUserLoggedIn(false);
      setIsGapiReady(false);
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    isUserLoggedIn,
    isGapiReady,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
