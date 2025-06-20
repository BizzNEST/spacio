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
import useGetPeople from '../../api/people/useGetPeople';

const centerName = localStorage.getItem('center');

function Layout() {
  const { setUserInfo } = useAuth();
  const [center, setCenter] = React.useState(`${centerName ?? 'Salinas'}`);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  //NOTE: This fetches all calendars that users are subscribed to
  const { data: allCalendars, isLoading: isLoadingCalendars } =
    useGetCalendars();

  const centerCalendars = !isLoadingCalendars
    ? allCalendars.filter((calendar) => calendar.location === center)
    : [];

  //NOTE: This fetches all people in domain
  const { data: people, isLoading: isLoadingPeople } =
    useGetPeople(allCalendars);

  //NOTE: This fetches 25 events from all subscribed calendars
  const { data: events, isLoading: isLoadingEvents } = useFetchAllEvents(
    centerCalendars,
    people
  );

  //NOTE: This fetches logged in user info
  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetUserInfo();

  //NOTE: This fetches availability for all calendars at center
  const { data: calendarAvailabilities, isLoading: isLoadingAvailabilities } =
    useGetAvailability(centerCalendars);

  React.useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo, setUserInfo]);

  if (isLoadingCalendars || isLoadingUserInfo || isLoadingPeople) {
    return <Loader label={'Preparing your dashboard...'} />;
  }

  return (
    <div className={`${isCollapsed ? styles.layoutCollapsed : styles.layout}`}>
      <SideNav
        className={styles.sideNav}
        availabilities={calendarAvailabilities}
        center={center}
        setCenter={setCenter}
        isLoadingAvailabilities={isLoadingAvailabilities}
        isCollapsed={isCollapsed}
      />
      <Dashboard className={styles.dashboard}>
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          centerName={center}
        />
        <CalendarDashboard
          events={events}
          calendars={centerCalendars}
          isLoadingEvents={isLoadingEvents}
        />
      </Dashboard>
    </div>
  );
}

export default Layout;
