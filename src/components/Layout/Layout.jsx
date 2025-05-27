import React from 'react';
import styles from './Layout.module.css';
import SideNav from '../SideNav/SideNav';
import Dashboard from '../Dashboard/Dashboard';
import CalendarDashboard from '../CalendarDashboard/CalendarDashboard';
import Header from '../Header/Header';
import useGetCalendars from '../../api/calendars/useGetCalendars';
import { useGetAvailability } from '../../api/availability/useGetAvailability';
import { useFetchAllEvents } from '../../api/events/useGetEvents';
import Loader from '../Loader/Loader';
import useGetUserInfo from '../../api/users/useGetUserInfo';
import { useAuth } from '../../contexts/authContext';

const centerName = localStorage.getItem('center');

function Layout() {
  const { setUserInfo } = useAuth();
  const [center, setCenter] = React.useState(`${centerName ?? 'Salinas'}`);

  const centerCalendars = allCalendars.filter(
    (calendar) => calendar.location === center
  );

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
  //NOTE: This fetches logged in user info
  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetUserInfo();

  //NOTE: This fetches availability for all subscribed calendars
  const { data: calendarAvailabilities, isLoading: isLoadingAvailabilities } =
    useGetAvailability(centerCalendars);

  React.useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo, setUserInfo]);

  if (
    isLoadingCalendars ||
    isLoadingEvents ||
    isLoadingUserInfo ||
    isLoadingAvailabilities
  ) {
    return <Loader label={'Preparing your dashboard...'} />;
  }

  return (
    <div className={styles.layout}>
      <SideNav
        availabilities={calendarAvailabilities}
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
