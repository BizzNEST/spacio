import React from 'react';
import styles from './Layout.module.css';
import SideNav from '../SideNav/SideNav';
import Dashboard from '../Dashboard/Dashboard';
import CalendarDashboard from '../CalendarDashboard/CalendarDashboard';
import Header from '../Header/Header';
import useGetCalendars from '../../api/calendars/useGetCalendars';
import { useFetchAllEvents } from '../../api/events/useGetEvents';
import Loader from '../Loader/Loader';
import { set } from 'date-fns';

const centerName = localStorage.getItem('center');

function Layout() {
  const [center, setCenter] = React.useState(`${centerName ?? 'Salinas'}`);

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

  const centerCalendars = allCalendars.filter(
    (calendar) => calendar.location === center
  );

  return (
    <div className={styles.layout}>
      <SideNav
        calendars={centerCalendars}
        center={center}
        setCenter={setCenter}
      />
      <Dashboard>
        <Header centerName={center} />
        <CalendarDashboard events={events} calendars={centerCalendars} />
      </Dashboard>
    </div>
  );
}

export default Layout;
