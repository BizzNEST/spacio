const useFetchAllEvents = (calendars, rooms) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const allEvents = [];

      for (const calendar of calendars) {
        const calendarEvents = await getEvents(calendar.id);

        const matchedRoom = rooms.find((room) =>
          calendar.summary.includes(room.title)
        );

        if (matchedRoom) {
          const eventsWithResource = calendarEvents.map((event) => ({
            ...event,
            resourceId: matchedRoom.id,
          }));

          allEvents.push(...eventsWithResource);
        }
      }

      setEvents(allEvents);
    };

    if (
      gapi.auth2.getAuthInstance().isSignedIn.get() &&
      calendars.length > 0 &&
      rooms.length > 0
    ) {
      fetchAllEvents();
    }
  }, [calendars, rooms]); // make sure both are included

  return events;
};

export default useFetchAllEvents;
