import React from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/authContext';

import Logo from '../assets/logo.svg?react';
import { gapi } from 'gapi-script';
import useGetToken from '../api/tokens/useGetToken';

const scopes = import.meta.env.VITE_SCOPE;

function Login() {
  const { isUserLoggedIn, setIsUserLoggedIn, loading, setAccessToken } =
    useAuth();
  const navigate = useNavigate();

  const tokenMutation = useGetToken();

  //Redirect to home if user is already logged in
  React.useEffect(() => {
    if (!loading && isUserLoggedIn) {
      navigate('/');
    }
  }, [isUserLoggedIn, loading, navigate]);

  const googleSignIn = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const data = await tokenMutation.mutateAsync({ code });

        const accessToken = data.access_token;
        const expiresIn = data.expiry_date;

        // Save token and expiry
        localStorage.setItem('token', accessToken);
        localStorage.setItem('expires_at', expiresIn.toString());

        setAccessToken(accessToken);
        gapi.client.setToken({ access_token: accessToken });
        setIsUserLoggedIn(true);

        navigate('/');
      } catch (error) {
        console.log('Login Failed:', error);
        setIsUserLoggedIn(false);
      }
    },
    onError: (error) => {
      console.log('Login Failed:', error);
      setIsUserLoggedIn(false);
    },
    flow: 'auth-code',
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
