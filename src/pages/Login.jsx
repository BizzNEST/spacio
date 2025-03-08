import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function Login() {
  const { handleSignIn, handleSignOut, isAuthorized, isLoading, events } =
    useAuth();

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>OfficeFlow</h1>
          <p className={styles.note}>Reservations made easy.</p>
        </div>

        {!isAuthorized ? (
          <button onClick={handleSignIn} className={styles.loginButton}>
            <FontAwesomeIcon icon={faGoogle} />
            Sign in with Google
          </button>
        ) : (
          <>
            <Navigate to={'/home'} />
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
