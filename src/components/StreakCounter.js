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
  const startDate = new Date('2018-01-01');
  const endDate = new Date('2018-02-01');
  const writes = getDateArray(startDate, endDate).map(date => dates.map(d => +new Date(d)).includes(date));
  const streaks = writes.reduce((res, n) => (n ? res[res.length - 1]++ : res.push(0), res), [0]);
  const count = Math.max(...streaks);
  return <h1>{count}</h1>;
};

export default StreakCounter;
