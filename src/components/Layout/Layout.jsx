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
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const centerName = localStorage.getItem('center');

function Layout() {
  const { setUserInfo } = useAuth();
  const [center, setCenter] = React.useState(`${centerName ?? 'Salinas'}`);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

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

  const centerCalendars = !isLoadingCalendars
    ? allCalendars.filter((calendar) => calendar.location === center)
    : [];

  //NOTE: This fetches availability for all calendars at center
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
    isLoadingUserInfo
    // ||
    // isLoadingAvailabilities
  ) {
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
        <CalendarDashboard events={events} calendars={centerCalendars} />
      </Dashboard>
    </div>
  );
}

export default Layout;
