import { GroupHashTable } from '../types';
import {toSeconds} from "./Time";

export class GroupGroups {

  value: GroupHashTable;

  constructor() {
    this.value = {};
  }

  push(group_name: string, date: string, durationIn: string) {
    if (!this.value[group_name]?.dates) {
      this.value[group_name] = {
        group_name,
        dates: {},
        duration: toSeconds(durationIn),
      };
    }

    this.value[group_name].dates[date] = true;
    this.value[group_name].duration += toSeconds(durationIn);
  }

}

