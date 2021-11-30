import { DateGroups } from './entities/DateGroups';
import { GroupGroups } from './entities/GroupGroups';
import { UnitGroups } from './entities/UnitGroups';
import { Visitations } from './entities/Visitations';

export class Store {

  public visitations: Visitations;
  public unitGroups: UnitGroups;
  public dateGroups: DateGroups;
  public groupGroups: GroupGroups;

  constructor() {
    this.visitations = new Visitations();
    this.unitGroups = new UnitGroups();
    this.dateGroups = new DateGroups();
    this.groupGroups = new GroupGroups();
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

}
