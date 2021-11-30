import { Visitation, VisitationHashTable } from '../types';

export class Visitations {

  value: VisitationHashTable;
  lastKey: number;

  constructor() {
    this.lastKey = 0;
    this.value = {};
  }

  push(value: Visitation) {
    this.lastKey++;

    value.id = this.lastKey;
    this.value[this.lastKey] = value;
  }

}
