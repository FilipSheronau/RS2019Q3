import render from '../controllers/renderController';

export default function () {
  // main .content .anydays
  render('div', '.content', {
    class: 'anydays',
  });

  // main .content .anydays .day1
  render('div', '.anydays', {
    class: 'day day1',
  });

  // .week-day
  render('div', '.day1', {
    class: 'week-day1',
  });

  // .day-temp1
  render('span', '.day1', {
    class: 'day-temp day-temp1',
  });

  // .day-icon1
  render('img', '.day1', {
    class: 'day-icon day-icon1',
  });

  // .day2
  render('div', '.anydays', {
    class: 'day day2',
  });

  // .week-day
  render('div', '.day2', {
    class: 'week-day2',
  });

  // .day-temp2
  render('span', '.day2', {
    class: 'day-temp day-temp2',
  });

  // .day-icon2
  render('img', '.day2', {
    class: 'day-icon day-icon2',
  });

  // .day3
  render('div', '.anydays', {
    class: 'day day3',
  });

  // .week-day
  render('div', '.day3', {
    class: 'week-day3',
  });

  // .day-temp3
  render('span', '.day3', {
    class: 'day-temp day-temp3',
  });

  // .day-icon3
  render('img', '.day3', {
    class: 'day-icon day-icon3',
  });
}
