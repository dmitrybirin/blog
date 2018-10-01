import React from 'react';
import PropTypes from 'prop-types';

const getDateArray = (start, end) => {
  const arr = [];
  const dt = new Date(start);
  while (dt <= end) {
    arr.push(+new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

const StreakCounter = ({ dates }) => {
  const startDate = new Date('2018-10-01');
  const endDate = new Date('2018-10-31');
  const writes = getDateArray(startDate, endDate).map(date => dates.map(d => +new Date(d)).includes(date));
  const streaks = writes.reduce((res, n) => (n ? res[res.length - 1]++ : res.push(0), res), [0]);
  const count = Math.max(...streaks);
  return (
    <div>
      <h3>
        Codetober
        <br />
        Streak Counter
      </h3>
      <h1>{count}</h1>
    </div>
  );
};

export default StreakCounter;

StreakCounter.propTypes = {
  dates: PropTypes.array.isRequired,
};
