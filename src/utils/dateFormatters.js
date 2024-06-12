import { dateFormat } from 'constant/DateTypes';
import moment from 'moment';

export const dateToEpoch = (date) => {
  return date.valueOf();
};

export const epochToDate = (epoch) => {
  return moment(epoch);
};

export const epochToDateString = (epoch) => {
  return moment(epoch).format(dateFormat);
};

export const dateToIso = (date) => {
  return moment.utc(date).toISOString();
};

export const isoDateToDate = (date, format) => {
  return moment.utc(date).format(format);
};
