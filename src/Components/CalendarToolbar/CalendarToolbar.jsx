import React from 'react';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import { Views } from 'react-big-calendar';
import { add, addDays, format, startOfWeek, sub } from 'date-fns';
import styles from './CalendarToolbar.module.css';

const VIEW_OPTION = [
  {
    id: Views.DAY,
    label: 'Day',
  },
  {
    id: Views.WORK_WEEK,
    label: 'Week',
  },
];

const CalendarToolbar = ({
  selectedRoomTypes,
  setSelectedRoomTypes,
  currentView,
  setCurrentView,
  currentDate,
  setCurrentDate,
}) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const handleRoomTypeFilter = (type) => {
    setSelectedRoomTypes(type ? type : 'all');
  };

  const onNextClick = React.useCallback(() => {
    console.log('Click');
    switch (currentView) {
      case Views.DAY:
        setCurrentDate(add(currentDate, { days: 1 }));
        break;

      case Views.WORK_WEEK:
        setCurrentDate(add(currentDate, { weeks: 1 }));
        break;

      default:
        setCurrentDate(add(currentDate, { days: 1 }));
        break;
    }
  }, [currentView, currentDate]);

  const onPreviousClick = React.useCallback(() => {
    switch (currentView) {
      case Views.DAY:
        setCurrentDate(sub(currentDate, { days: 1 }));
        break;

      case Views.WORK_WEEK:
        setCurrentDate(sub(currentDate, { weeks: 1 }));
        break;

      default:
        setCurrentDate(sub(currentDate, { days: 1 }));
        break;
    }
  }, [currentView, currentDate]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.navigationContainer}>
        <div className={styles.buttonContainer}>
          <button onClick={onPreviousClick}>Previous</button>
          <button onClick={() => setCurrentDate(new Date())}>Today</button>
          <button onClick={onNextClick}>Next</button>
        </div>
        {currentView === Views.WORK_WEEK ? (
          <p>
            {format(weekStart, 'EEEE, MMMM dd')} -{' '}
            {format(addDays(weekStart, 4), 'EEEE, MMMM dd')}
          </p>
        ) : (
          <p>{format(currentDate, 'EEEE, MMMM dd')}</p>
        )}
      </div>

      <div className={styles.filtersContainer}>
        <ButtonGroup
          type="single"
          value={selectedRoomTypes}
          onValueChange={(value) => handleRoomTypeFilter(value)}
        >
          <ButtonGroup.Item value={'all'} className={styles.toggle} asChild>
            <button>All Rooms</button>
          </ButtonGroup.Item>

          <ButtonGroup.Item value={'phone'} className={styles.toggle} asChild>
            <button>Phone Booths</button>
          </ButtonGroup.Item>

          <ButtonGroup.Item
            value={'conference'}
            className={styles.toggle}
            asChild
          >
            <button>Conference</button>
          </ButtonGroup.Item>
        </ButtonGroup>

        <ButtonGroup
          type="single"
          value={currentView}
          onValueChange={(value) => setCurrentView(value)}
        >
          {VIEW_OPTION.map(({ id, label }) => (
            <ButtonGroup.Item
              key={id}
              value={id}
              className={styles.toggle}
              asChild
            >
              <button>{label}</button>
            </ButtonGroup.Item>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CalendarToolbar;
