import React from 'react';
import styles from './Layout.module.css';
import SideNav from '../SideNav/SideNav';
import Dashboard from '../Dashboard/Dashboard';
import CalendarDashboard from '../CalendarDashboard/CalendarDashboard';
import Header from '../Header/Header';
import useGetCalendars from '../../api/calendars/useGetCalendars';
import { useFetchAllEvents } from '../../api/events/useGetEvents';
import Loader from '../Loader/Loader';

function Layout() {
  //NOTE: This fetches all calendars that users are subscribed to
  const { data: allCalendars, isLoading: isLoadingCalendars } =
    useGetCalendars();

  //NOTE: This fetches 25 events from all subscribed calendars
  const { data: events, isLoading: isLoadingEvents } = useFetchAllEvents(
    allCalendars,
    {
      enabled: !!allCalendars && allCalendars.length > 0,
    }
  );

  if (isLoadingCalendars || isLoadingEvents) {
    return <Loader label={'Preparing your dashboard...'} />;
  }

  return (
    <div className={styles.layout}>
      <SideNav />
      <Dashboard>
        <Header />
        <CalendarDashboard events={events} calendars={allCalendars} />
      </Dashboard>
    </div>
  );
}

export default Layout;
