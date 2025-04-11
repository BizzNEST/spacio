// components/calendar/WorkWeekView.js
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as dates from 'date-arithmetic';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';
import { Navigate } from 'react-big-calendar';

const WorkWeekView = ({ date, localizer, ...props }) => {
  const range = useMemo(
    () => WorkWeekView.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      {...props}
      range={range}
      eventOffset={15}
      date={date}
      localizer={localizer}
    />
  );
};

WorkWeekView.range = (date, { localizer }) => {
  const start = localizer.startOf(date, 'week');
  const range = [];

  for (let i = 1; i <= 5; i++) {
    const day = dates.add(start, i, 'day'); // Mon–Fri
    range.push(day);
  }

  return range;
};

WorkWeekView.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, 'week');
    case Navigate.NEXT:
      return localizer.add(date, 1, 'week');
    default:
      return date;
  }
};

WorkWeekView.title = (date, { localizer }) => {
  const start = localizer.startOf(date, 'week');
  const end = dates.add(start, 4, 'day');
  return `${localizer.format(start, 'MMM d')} – ${localizer.format(end, 'MMM d')}`;
};

WorkWeekView.propTypes = {
  date: PropTypes.instanceOf(Date),
  localizer: PropTypes.object,
};

export default WorkWeekView;
