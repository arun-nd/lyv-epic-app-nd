import { DateTime } from "luxon";
import config from "../config/instance"
// const DEFAULT_DATE_FORMAT = "dd MMM yyyy";
// const DEFAULT_TIME_FORMAT = "hh:mm a";
// const millisToFormattedDate = value => {
//   if (value) {
//     return DateTime.fromMillis(value).toFormat(config.date_time.events.DEFAULT_DATE_FORMAT);
//   }
// };

const millisToFormattedDate = value => {
  if (value) {
    return DateTime.fromMillis(value, { zone: config.date_time.events.zone }).toFormat(config.date_time.events.DEFAULT_DATE_FORMAT);
  }
};

const isoToFormattedDate = value => {
  if (value) {
    return DateTime.fromISO(value).toFormat(config.date_time.events.DEFAULT_DATE_FORMAT);
  }
};

const millisToFormattedTime = value => {
  if (value) {
    return DateTime.fromMillis(value, { zone: config.date_time.events.zone }).toFormat(config.date_time.events.DEFAULT_TIME_FORMAT);
  }
};

const dobToFormatted = value => {
  if (value) {
    return DateTime.fromFormat(value, { zone: config.date_time.events.zone }).diffNow('years')
  }
};

export default {
  millisToFormattedDate,
  isoToFormattedDate,
  millisToFormattedTime,
  dobToFormatted
};
