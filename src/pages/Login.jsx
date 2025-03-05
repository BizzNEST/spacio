import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import useAuth from '../hooks/useAuth';

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
            <button onClick={handleSignOut}>Sign out</button>
            <h2>Your Upcoming Events:</h2>
            <ul>
              {isLoading ? (
                <p>Loading events...</p>
              ) : events.length > 0 ? (
                events.map((event, index) => (
                  <li key={index}>
                    <strong>{event.summary}</strong>
                    <p>
                      {new Date(
                        event.start.dateTime || event.start.date
                      ).toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <p>No upcoming events.</p>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
