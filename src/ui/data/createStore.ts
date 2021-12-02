import { Store } from './store';

import {
  Unit,
  Visitation,
} from './types';

type CollectDatesReduce = (unit: Unit) => void;
type CollectUnitDatesReduce = (visitation: Visitation) => void;

export const createStore = (units: Unit[]) => {
  const store = new Store();

  const collectDates:CollectDatesReduce = (unit)  => {
    const collectUnitDates:CollectUnitDatesReduce = (visitation) => {
      store.visitations.push(visitation);
      const lastVisitationId = store.visitations.lastKey

      const date_begin = visitation.time_begin.slice(0, 10);
      const date_end = visitation.time_end.slice(0, 10);
      store.unitGroups.push({
        group_name: unit.group_name,
        unit_name: unit.unit_name,
        date: date_begin,
      }, lastVisitationId, visitation.duration_in);

      if (date_begin !== date_end) {
        store.unitGroups.push({
          group_name: unit.group_name,
          unit_name: unit.unit_name,
          date: date_end,
        }, lastVisitationId, visitation.duration_in);
      }

      store.dateGroups.push({
        group_name: unit.group_name,
        date: date_begin,
      }, unit.unit_name, visitation.duration_in);
      if (date_begin !== date_end) {
        store.dateGroups.push({
          group_name: unit.group_name,
          date: date_end,
        }, unit.unit_name, visitation.duration_in);
      }


      store.groupGroups.push(unit.group_name, date_begin, visitation.duration_in);
      if (date_begin !== date_end) {
        store.groupGroups.push(unit.group_name, date_end, visitation.duration_in);
      }
    };

    unit.data.forEach(collectUnitDates);
  };

  units.forEach(collectDates);

  console.log(store);

  return store;
};



