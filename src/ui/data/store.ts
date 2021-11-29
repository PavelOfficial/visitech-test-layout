import unitsRaw from './data.json';

import {
  Store,
  Unit,
  Visitation,
} from './types';

const units = unitsRaw as unknown as Unit[];

type CollectDatesReduce = (unit: Unit) => void;
type CollectUnitDatesReduce = (visitation: Visitation) => void;

let visitationId = 0;

const store: Store = {
  visitations: {},
  dateGroups: {},
  groupGroups: {},
  unitGroups: {},
};

const pushVisitation = (unit_name: string, visitationId: number) => {
  if (!store.unitGroups[unit_name]?.visitations) {
    store.unitGroups[unit_name] = {
      unit_name,
      visitations: [],
    };
  }

  store.unitGroups[unit_name].visitations.push(visitationId);
};

const pushUnit = (date: string, unit_name: string) => {
  if (!store.dateGroups[date]?.units) {
    store.dateGroups[date] = {
      date,
      units: {},
    };
  }

  store.dateGroups[date].units[unit_name] = true;
};

const pushDate = (group_name: string, date: string) => {
  if (!store.groupGroups[group_name]?.dates) {
    store.groupGroups[group_name] = {
      group_name,
      dates: {},
    };
  }

  store.groupGroups[group_name].dates[date] = true;
};

const collectDates:CollectDatesReduce = (unit)  => {
  const collectUnitDates:CollectUnitDatesReduce = (visitation) => {
    visitationId += 1;
    visitation.id = visitationId;
    store.visitations[visitationId] = visitation;

    const date_begin = visitation.time_begin.slice(0, 10);
    const date_end = visitation.time_end.slice(0, 10);
    pushVisitation(unit.group_name + '/' + unit.unit_name + '/' + date_begin, visitation.id);
    pushVisitation(unit.group_name + '/' + unit.unit_name + '/' + date_end, visitation.id);

    pushUnit(date_begin + '/' + unit.group_name, unit.unit_name);
    pushUnit(date_end  + '/' + unit.group_name, unit.unit_name);

    pushDate(unit.group_name, date_begin);
    pushDate(unit.group_name, date_end);
  };

  unit.data.forEach(collectUnitDates);
};

let cashed = false;

export const getStore = () => {
  if (!cashed) {
    units.forEach(collectDates);
    cashed = true;
  }

  return store;
}

