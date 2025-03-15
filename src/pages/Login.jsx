import React, { useEffect } from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { handleSignIn, isAuthorized, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      setTimeout(() => {
        navigate('/home');
      }, 500);
    }
  }, [isAuthorized, navigate]);

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>OfficeFlow</h1>
          <p className={styles.note}>Reservations made easy.</p>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : !isAuthorized ? (
          <button onClick={handleSignIn} className={styles.loginButton}>
            <FontAwesomeIcon icon={faGoogle} />
            Sign in with Google
          </button>
        ) : (
          <p>Redirecting...</p>
        )}
      </div>
    </div>
  );
}

export default Login;