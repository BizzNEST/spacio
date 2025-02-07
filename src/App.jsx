import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import SideNav from './components/SideNav/SideNav.jsx';
import Layout from './components/Layout/Layout.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Header from './Components/Header/Header.jsx';

import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script"; //Import the Google API client

const CLIENT_ID = '6291519967-8fjqsblq8f433hqp9is5j309t6tp73iu.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDyHOFhB2MSQYnQ8SZjnm27sCEJ2VjZyRo';
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";  // Permission scope for read-only access to the calendar

function App() {
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
    <div>
      <h1>Google Calendar API Quickstart</h1>
      {!isAuthorized ? (
        <button onClick={handleSignIn}>Sign in with Google</button>
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
  );
  /*return (
    <Layout>
      <Header />
      <SideNav />

      <Dashboard title="Meeting Rooms">
        <Navbar />
      </Dashboard>
    </Layout>
  );*/
}

export default App;
