import { GroupHashTable } from '../types';
import { toSeconds } from './Time';

export class GroupGroups {

  value: GroupHashTable;

  constructor() {
    this.value = {};
  }

  push(group_name: string, date: string, durationIn: string) {
    const duration = toSeconds(durationIn);

    if (!this.value[group_name]?.dates) {
      this.value[group_name] = {
        group_name,
        dates: {},
        _duration: duration,
        durationString: '00:00:00',
        get duration() {
          return this.durationString;
        }
      };
    }

    this.value[group_name].dates[date] = true;
    this.value[group_name]._duration += duration;
  }

}

