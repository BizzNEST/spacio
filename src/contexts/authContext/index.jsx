import React, { createContext, useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import PropTypes from 'prop-types';

// Create the context
const AuthContext = createContext();

// Fetch environment variables
const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;
const scope = import.meta.env.VITE_SCOPE;

export function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isGapiReady, setIsGapiReady] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  //Schedule auto logout after specified time in milliseconds
  function scheduleAutoLogout(timeoutMs) {
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
      setIsUserLoggedIn(false);
      setAccessToken(null);
      window.location.href = '/';
    }, timeoutMs);
  }

  // Initialize GAPI
  useEffect(() => {
    async function initializeGapi() {
      try {
        await new Promise((resolve) => gapi.load('client:auth2', resolve));
        await gapi.client.init({
          apiKey,
          clientId,
          scope,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
        });

        //Retrieve the token and expiration from local storage
        const storedToken = localStorage.getItem('token');
        const expiresAt = parseInt(localStorage.getItem('expires_at'), 10);

        //If token exists and is not expired, log user automatically, otherwise, log them out
        if (storedToken && expiresAt && Date.now() < expiresAt) {
          gapi.client.setToken({ access_token: storedToken });
          setAccessToken(storedToken);
          setIsUserLoggedIn(true);

          // Ensures auto logout even if window is closed
          scheduleAutoLogout(expiresAt - Date.now());
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('expires_at');
          setIsUserLoggedIn(false);
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
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        accessToken,
        setAccessToken,
        isGapiReady,
        loading,
        scheduleAutoLogout,
        userInfo,
        setUserInfo,
      }}
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
