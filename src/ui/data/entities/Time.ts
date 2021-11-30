
const MINUTE_SECONDS = 60;
const HOUR_SECONDS = 60 * MINUTE_SECONDS;

export const toSeconds = (stringTime:string) => {
  const time = stringTime.split(':').map((item) => {
    return parseInt(item, 10);
  });

  const result = time[2] + (time[1] * MINUTE_SECONDS) + (time[0] * HOUR_SECONDS);

  return result;
};

export const toTimeString = (value: number) => {
  const seconds = value % MINUTE_SECONDS;
  const minutes = Math.floor(value  / MINUTE_SECONDS);
  const hours = Math.floor(value / HOUR_SECONDS);

  return `${hours}:${minutes}:${seconds}`;
};
