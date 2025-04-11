// This could replace your getEvents API call for testing
const mockEvents = [
  {
    id: 1,
    title: 'Client Meeting',
    start: new Date(2025, 3, 11, 10, 0), // April 11, 2025 at 10:00 AM
    end: new Date(2025, 3, 11, 11, 0), // April 11, 2025 at 11:00 AM
    resourceId: 1, // Phone Booth 1
    eventType: 'client',
  },
  {
    id: 2,
    title: '1:1 Meeting',
    start: new Date(2025, 3, 11, 11, 0), // April 11, 2025 at 11:00 AM
    end: new Date(2025, 3, 11, 13, 0), // April 11, 2025 at 1:00 PM
    resourceId: 2, // Phone Booth 2
    eventType: 'client',
  },
  {
    id: 3,
    title: 'Product Review',
    start: new Date(2025, 3, 11, 9, 0), // April 11, 2025 at 9:00 AM
    end: new Date(2025, 3, 11, 11, 0), // April 11, 2025 at 11:00 AM
    resourceId: 3, // Conference Room A
    eventType: 'internal',
  },
  {
    id: 4,
    title: 'Sprint Planning',
    start: new Date(2025, 3, 11, 13, 0), // April 11, 2025 at 1:00 PM
    end: new Date(2025, 3, 11, 14, 0), // April 11, 2025 at 2:00 PM
    resourceId: 3, // Conference Room A
    eventType: 'internal',
  },
  {
    id: 5,
    title: 'Sales Call',
    start: new Date(2025, 3, 11, 10, 0), // April 11, 2025 at 10:00 AM
    end: new Date(2025, 3, 11, 11, 0), // April 11, 2025 at 11:00 AM
    resourceId: 4, // Phone Booth 3
    eventType: 'client',
  },
  {
    id: 6,
    title: 'Interview',
    start: new Date(2025, 3, 11, 14, 0), // April 11, 2025 at 2:00 PM
    end: new Date(2025, 3, 11, 15, 0), // April 11, 2025 at 3:00 PM
    resourceId: 4, // Phone Booth 3
    eventType: 'interview',
  },
  {
    id: 7,
    title: 'Client Call',
    start: new Date(2025, 3, 11, 11, 0), // April 11, 2025 at 11:00 AM
    end: new Date(2025, 3, 11, 13, 0), // April 11, 2025 at 1:00 PM
    resourceId: 5, // Phone Booth 4
    eventType: 'client',
  },
  {
    id: 8,
    title: 'Team Sync',
    start: new Date(2025, 3, 11, 9, 0), // April 11, 2025 at 9:00 AM
    end: new Date(2025, 3, 11, 11, 0), // April 11, 2025 at 11:00 AM
    resourceId: 6, // Conference Room B
    eventType: 'internal',
  },
  {
    id: 9,
    title: 'Quarterly Review',
    start: new Date(2025, 3, 11, 13, 0), // April 11, 2025 at 1:00 PM
    end: new Date(2025, 3, 11, 14, 0), // April 11, 2025 at 2:00 PM
    resourceId: 6, // Conference Room B
    eventType: 'internal',
  },
];

export default mockEvents;
