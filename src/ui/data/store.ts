import { DateGroups } from './entities/DateGroups';
import { GroupGroups } from './entities/GroupGroups';
import { UnitGroups } from './entities/UnitGroups';
import { Visitations } from './entities/Visitations';
import {
  DateGroup,
  UnitGroup,
  Visitation,
} from './types';

export class Store {

  public visitations: Visitations;
  public unitGroups: UnitGroups;
  public dateGroups: DateGroups;
  public groupGroups: GroupGroups;
  private dateHashTable: { [key: string]: DateGroup[] };
  private unitHashTable: { [key: string]: UnitGroup[] };
  private visitationHashTable: { [key: string]: Visitation[] };

  constructor() {
    this.visitations = new Visitations();
    this.unitGroups = new UnitGroups();
    this.dateGroups = new DateGroups();
    this.groupGroups = new GroupGroups();
    this.dateHashTable = {};
    this.unitHashTable = {};
    this.visitationHashTable = {};
  }

  get value() {
    return {
      visitations: this.visitations.value,
      unitGroups: this.unitGroups.value,
      dateGroups: this.dateGroups.value,
      groupGroups: this.groupGroups.value,
    };
  }

  selectGroups() {
    return Object.values(this.groupGroups.value);
  }

  selectFullDuration() {
    return this.groupGroups.fullDuration;
  }

  selectDates(group_name: string) {
    if (!Object.prototype.hasOwnProperty.call(this.dateHashTable, group_name)) {
      const { dates } = this.groupGroups.value[group_name];
      const dateGroups = this.dateGroups.value;
      const value = [];

      const { hasOwnProperty } = Object.prototype;
      for (let key in dates) {
        if (hasOwnProperty.call(dates, key)) {
          value.push(dateGroups[key]);
        }
      }

      this.dateHashTable[group_name] = value;
    }

    return this.dateHashTable[group_name];
  }

  selectUnits(group_name: string, date: string) {
    const units_key = DateGroups.createKey(group_name, date);
    if (!Object.prototype.hasOwnProperty.call(this.unitHashTable, units_key)) {
      const { units } = this.dateGroups.value[units_key];
      const unitGroups = this.unitGroups.value;
      const value = [];

      const { hasOwnProperty } = Object.prototype;
      for (let key in units) {
        if (hasOwnProperty.call(units, key)) {
          value.push(unitGroups[key]);
        }
      }

      this.unitHashTable[units_key] = value;
    }

    return this.unitHashTable[units_key];
  }

  selectVisitations(group_name: string, date: string, unit_name: string) {
    const visitations_key = UnitGroups.createKey(group_name, date, unit_name);
    if (!Object.prototype.hasOwnProperty.call(this.visitationHashTable, visitations_key)) {
      const { visitations } = this.unitGroups.value[visitations_key];
      const visitationValues = this.visitations.value;
      const value = [];

      const { hasOwnProperty } = Object.prototype;
      for (let key in visitations) {
        if (hasOwnProperty.call(visitations, key)) {
          value.push(visitationValues[key]);
        }
      }

      this.visitationHashTable[visitations_key] = value;
    }

    return this.visitationHashTable[visitations_key];
  }

}
