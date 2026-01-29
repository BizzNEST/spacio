import React from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/authContext';

import Logo from '../assets/logo.svg?react';

const scopes = import.meta.env.VITE_SCOPE;

function Login() {
  const [userEmail, setUserEmail] = React.useState('');
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setAccessToken,
    loading,
    scheduleAutoLogout,
  } = useAuth();
  const navigate = useNavigate();

  //Redirect to home if user is already logged in
  React.useEffect(() => {
    if (!loading && isUserLoggedIn) {
      navigate('/home');
    }
  }, [isUserLoggedIn, loading, navigate]);

  const googleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Access Token expires in 1 hour
      const expiresAt = Date.now() + tokenResponse.expires_in * 1000;

      setIsUserLoggedIn(true);
      setAccessToken(tokenResponse.access_token);

      window.localStorage.setItem('token', tokenResponse.access_token);
      window.localStorage.setItem('expires_at', expiresAt.toString());

      // Automatically sign out after 1 hour since login
      scheduleAutoLogout(tokenResponse.expires_in * 1000);
      try {
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const profile = await res.json();
        setUserEmail(profile.email);
        window.localStorage.setItem('userEmail', profile.email);
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    },
    onError: (error) => {
      console.log('Login Failed:', error);
      setIsUserLoggedIn(false);
    },
    scope: scopes,
  });

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Logo className={styles.logo} />
          <p className={styles.note}>Reservations made easy.</p>
        </div>

        <button onClick={googleSignIn} className={styles.loginButton}>
          <FontAwesomeIcon icon={faGoogle} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
