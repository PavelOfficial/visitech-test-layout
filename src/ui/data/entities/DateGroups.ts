import { DateHashTable } from '../types';
import { toSeconds, toTimeString } from './Time';

type Key = {
  group_name: string,
  date: string
};

export class DateGroups {

  static createKey(group_name: string, date: string) {
    return `${group_name}/${date}`;
  }

  value: DateHashTable;

  constructor() {
    this.value = {};
  }

  push({ group_name, date }: Key, unit_name: string, durationIn: string) {
    const key = DateGroups.createKey(group_name, date);
    const duration = toSeconds(durationIn);

    if (!this.value[key]?.units) {
      this.value[key] = {
        date,
        units: {},
        _duration: 0,
        durationString: null,
        get duration() {
          if (this.durationString === null) {
            this.durationString = toTimeString(this._duration);
          }

          return this.durationString;
        }
      };
    }

    this.value[key].units[unit_name] = true;
    this.value[key]._duration += toSeconds(durationIn);
  }

}

