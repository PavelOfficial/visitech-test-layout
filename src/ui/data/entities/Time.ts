
const MINUTE_SECONDS = 60;
const HOUR_SECONDS = 60 * MINUTE_SECONDS;
const DAY_SECONDS = 12 * HOUR_SECONDS;

const leadingZero = (value: number) => {
  if (value < 10) {
    return ('0' + value).slice(-2);
  }

  return value;
};

const parseTimeReg = /(\d+)?(:? days )?(\d+):(\d+):(\d+)$/

export const toSeconds = (stringTime:string) => {
  const result = stringTime.match(parseTimeReg);

  if (result === null) {
    return 0;
  }

  let time = 0;

  if (result[1]) {
    time += parseInt(result[1], 10) * DAY_SECONDS;
  }

  time += parseInt(result[3], 10) * HOUR_SECONDS;
  time += parseInt(result[4], 10) * MINUTE_SECONDS;
  time += parseInt(result[5], 10);

  return time;
};

export const toTimeString = (value: number) => {
  const seconds = leadingZero(value % MINUTE_SECONDS);
  const minutes = leadingZero(Math.floor((value % HOUR_SECONDS)  / MINUTE_SECONDS));
  const hours = leadingZero(Math.floor((value % DAY_SECONDS) / HOUR_SECONDS));
  const days = Math.floor(value / DAY_SECONDS);

  return `${days ? `${days} days ` : ''}${hours}:${minutes}:${seconds}`;
};

// 19:58:28
