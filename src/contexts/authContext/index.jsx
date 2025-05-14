import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { gapi } from 'gapi-script';
import PropTypes from 'prop-types';
import { auth } from '../../api/firebase.config';

// Create the context
const AuthContext = createContext();

// Fetch environment variables
const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;
const scope = import.meta.env.VITE_SCOPE;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isGapiReady, setIsGapiReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // Firebase Authenication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Initialize GAPI
  useEffect(() => {
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

        const token = localStorage.getItem('google_access_token');
        if (token) {
          gapi.client.setToken({ access_token: token });
        }

        setIsGapiReady(true);
      } catch (error) {
        console.error('Error initializing GAPI:', error);
      } finally {
        setLoading(false);
      }
    }

    initializeGapi();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isUserLoggedIn, isGapiReady, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;

export function useAuth() {
  return React.useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
