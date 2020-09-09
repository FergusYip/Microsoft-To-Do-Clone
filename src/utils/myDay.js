import moment from 'moment';

export const todayIsMyDay = (todo) =>
  todo && todo.myDay && moment().isSame(moment.unix(todo.myDay.seconds), 'day');
