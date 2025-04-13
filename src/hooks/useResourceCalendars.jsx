import { useState, useEffect } from 'react';
import getCalendars from '../api/getCalendars';
import useAuth from './useAuth';

const useResourceCalendars = (rooms) => {
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState('');
  const { isAuthorized } = useAuth();

  useEffect(() => {
    const fetchCalendars = async () => {
      const calendarList = await getCalendars();

      const resourceCalendars = calendarList.filter((calendar) =>
        rooms.some((room) => calendar.summary.includes(room.title))
      );

      setCalendars(resourceCalendars);
      setSelectedCalendarId(resourceCalendars[0]?.id || '');
    };

    if (isAuthorized) {
      fetchCalendars();
    }
  }, [rooms]);

  return { calendars, selectedCalendarId, setSelectedCalendarId };
};

export default useResourceCalendars;
