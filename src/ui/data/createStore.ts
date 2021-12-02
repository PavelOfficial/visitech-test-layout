import { Store } from './store';

import {
  Unit,
  Visitation,
} from './types';
import { toSeconds, toTimeString } from "./entities/Time";

type CollectDatesReduce = (unit: Unit) => void;
type CollectUnitDatesReduce = (visitation: Visitation) => void;

const leadingZero = (value: number) => {
  return ('0' + value).slice(-2);
};

const lessDate = (date: Date, targetDate: Date) => {
  if (date.getFullYear() < targetDate.getFullYear()) {
    return true;
  }

  if (date.getFullYear() === targetDate.getFullYear()) {
    if (date.getMonth() < targetDate.getMonth()) {
      return true;
    }

    if (date.getMonth() === targetDate.getMonth()) {
      if (date.getDate() < targetDate.getDate()) {
        return true;
      }
    }
  }

  return false;
};

const toDateString = (date: Date) => {
  return `${date.getFullYear()}.${leadingZero(date.getMonth() + 1)}.${leadingZero(date.getDate())}`;
}

const getDayDurations = (visitation: Visitation) => {
  const date_begin = visitation.time_begin.slice(0, 10);
  const date_end = visitation.time_end.slice(0, 10);
  const dayDurations = [];

  if (date_begin === date_end) {
    dayDurations.push({
      date: date_begin,
      duration: visitation.duration_in,
    });
  } else {
    const dayTime = toSeconds('24:00:00');
    const time_begin = toTimeString(dayTime - toSeconds(visitation.time_begin.slice(-8)));
    const time_end = toTimeString(toSeconds(visitation.time_end.slice(-8)));

    dayDurations.push({
      date: date_begin,
      duration: time_begin,
    });

    dayDurations.push({
      date: date_end,
      duration: time_end,
    });

    let dateItem = new Date(date_begin);
    dateItem.setDate(dateItem.getDate() + 1);
    let dateEnd = new Date(date_end);

    while (lessDate(dateItem, dateEnd)) {
      dayDurations.push({
        date: toDateString(dateItem),
        duration: '24:00:00',
      });

      dateItem.setDate(dateItem.getDate() + 1);
    }
  }

  return dayDurations;
};

export const createStore = (units: Unit[]) => {
  const store = new Store();

  const collectDates:CollectDatesReduce = (unit)  => {
    const collectUnitDates:CollectUnitDatesReduce = (visitation) => {
      store.visitations.push(visitation);
      const lastVisitationId = store.visitations.lastKey
      const dayDurations = getDayDurations(visitation);

      dayDurations.forEach(({ date, duration }) => {
        store.unitGroups.push({
          group_name: unit.group_name,
          unit_name: unit.unit_name,
          date,
        }, lastVisitationId, duration);
      });

      dayDurations.forEach(({ date, duration }) => {
        store.dateGroups.push({
          group_name: unit.group_name,
          date,
        }, unit.unit_name, duration);
      });

      dayDurations.forEach(({ date, duration }) => {
        store.groupGroups.push(unit.group_name, date, duration);
      });
    };

    unit.data.forEach(collectUnitDates);
  };

  units.forEach(collectDates);

  console.log(store);

  return store;
};



