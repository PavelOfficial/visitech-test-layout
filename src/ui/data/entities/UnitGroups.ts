import { UnitHashTable } from "../types";
import { toSeconds, toTimeString } from "./Time";

type Key = {
  group_name: string,
  unit_name: string,
  date: string,
}

export class UnitGroups {

  static createKey(group_name: string, unit_name: string, date: string) {
    return `${group_name}/${unit_name}/${date}`;
  }

  value: UnitHashTable;

  constructor() {
    this.value = {};
  }

  push({ group_name, unit_name, date }: Key, visitationId: number, durationIn: string) {
    const key = UnitGroups.createKey(group_name, unit_name, date);
    const seconds = toSeconds(durationIn);

    if (!this.value[key]?.visitations) {
      this.value[key] = {
        unit_name,
        visitations: [],
        _duration: seconds,
        _minDuration: seconds,
        _maxDuration: seconds,
        durationString: null,
        minDurationString: null,
        maxDurationString: null,
        get duration() {
          if (this.durationString === null) {
            this.durationString = toTimeString(this._duration);
          }

          return this.durationString;
        },
        get minDuration() {
          if (this.minDurationString === null) {
            this.minDurationString = toTimeString(this._minDuration);
          }

          return this.minDurationString;
        },
        get maxDuration() {
          if (this.maxDurationString === null) {
            this.maxDurationString = toTimeString(this._maxDuration);
          }

          return this.maxDurationString;
        }
      };
    }

    this.value[key].visitations.push(visitationId);
    this.value[key]._duration += seconds;

    this.value[key]._minDuration = seconds < this.value[key]._minDuration ? seconds : this.value[key]._minDuration;
    this.value[key]._maxDuration = seconds > this.value[key]._maxDuration ? seconds : this.value[key]._maxDuration;
  }

}
