import React, { createContext, useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import PropTypes from 'prop-types';
import useRefreshToken from '../../api/tokens/useRefreshToken';

// Create the context
const AuthContext = createContext();

// Fetch environment variables
const clientId = import.meta.env.VITE_CLIENT_ID;
const scope = import.meta.env.VITE_SCOPE;

export function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isGapiReady, setIsGapiReady] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const refreshTokenMutation = useRefreshToken();

  async function refreshAccessToken() {
    try {
      const data = await refreshTokenMutation.mutateAsync();
      const { access_token, expiry_date } = data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('expires_at', expiry_date.toString());

      gapi.client.setToken({ access_token });
      setAccessToken(access_token);
      setIsUserLoggedIn(true);
    } catch (err) {
      console.error('Error refreshing token:', err);
      setIsUserLoggedIn(false);
      setAccessToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
    }
  }

  // Initialize GAPI
  useEffect(() => {
    async function initializeGapi() {
      try {
        await new Promise((resolve) => gapi.load('client:auth2', resolve));
        await gapi.client.init({
          clientId,
          scope,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            'https://people.googleapis.com/$discovery/rest?version=v1',
            'https://admin.googleapis.com/$discovery/rest?version=directory_v1',
          ],
        });

        //Retrieve the token and expiration from local storage
        const storedToken = localStorage.getItem('token');
        const expiresAt = parseInt(localStorage.getItem('expires_at'), 10);
        const isValid = storedToken && expiresAt && Date.now() < expiresAt;

        //If token is valid, log user automatically. Otherwise, attempt to refresh
        if (isValid) {
          gapi.client.setToken({ access_token: storedToken });
          setAccessToken(storedToken);
          setIsUserLoggedIn(true);
        } else {
          await refreshAccessToken();
        }
      } catch (error) {
        console.error('Error initializing GAPI:', error);
      } finally {
        setIsGapiReady(true);
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
