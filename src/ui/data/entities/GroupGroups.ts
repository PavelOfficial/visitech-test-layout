import { GroupHashTable } from '../types';
import { toSeconds, toTimeString } from './Time';

export class GroupGroups {

  value: GroupHashTable;

  _fullDuration: number;

  _fullDurationString: number|null;

  constructor() {
    this.value = {};
    this._fullDuration = 0;
    this._fullDurationString = null;
  }

  get fullDuration() {
    if (this._fullDurationString === null) {
      return toTimeString(this._fullDuration);
    }

    return this._fullDurationString;
  }

  push(group_name: string, date: string, durationIn: string) {
    const duration = toSeconds(durationIn);

    if (!this.value[group_name]?.dates) {
      this.value[group_name] = {
        group_name,
        dates: {},
        _duration: duration,
        durationString: null,
        get duration() {
          if (this.durationString === null) {
            this.durationString = toTimeString(this._duration);
          }

          return this.durationString;
        }
      };
    }

    this.value[group_name].dates[date] = true;
    this.value[group_name]._duration += duration;
    this._fullDuration += duration;
  }

}

