import moment from 'moment';

export function getDueToday() {
  return moment().startOf('day');
}

export function getDueTomorrow() {
  return moment().add(1, 'days').startOf('day');
}

export function getDueNextWeek() {
  return moment().day(7).startOf('day');
}
