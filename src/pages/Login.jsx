//import React from 'react';
import styles from './Login.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
<script src="login.js" defer></script>


import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script"; //Import the Google API client

const CLIENT_ID = '6291519967-8fjqsblq8f433hqp9is5j309t6tp73iu.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDyHOFhB2MSQYnQ8SZjnm27sCEJ2VjZyRo';
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";  // Permission scope for read-only access to the calendar

function Login() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [events, setEvents] = useState([]);

  // Initialize the Google API client
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES,
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  // Sign in and authorize the app
  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      setIsAuthorized(true);
      loadEvents();
    });
  };

  // Sign out of the app
  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsAuthorized(false);
      setEvents([]);
    });
  };

  // Load calendar events
  const loadEvents = () => {
    gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    }).then((response) => {
      setEvents(response.result.items);
    });
  };

  return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>OfficeFlow</h1>
          <p className={styles.note}>Reservations made easy.</p>
        </div>
        
        {!isAuthorized ? (
          <button onClick={handleSignIn} className={styles.loginButton}>
            <FontAwesomeIcon icon={faGoogle}/>
            Sign in with Google</button>
        ) : (
          <>
            <button onClick={handleSignOut}>Sign out</button>
            <h2>Your Upcoming Events:</h2>
            <ul>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <li key={index}>
                    <strong>{event.summary}</strong>
                    <p>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</p>
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
  /*return (
    <div className={styles.animatedBackground}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>OfficeFlow</h1>
          <p className={styles.note}>Reservations made easy.</p>
        </div>
        <button className={styles.loginButton}>
        <FontAwesomeIcon icon={faGoogle}/>
    
        Sign In with Google</button>
      </div>
    </div>
  );*/
}


export default Login;