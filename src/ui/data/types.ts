
export type UnitGroups = {
  unit_name: string,
  visitations: number[],
};

export type UnitHashTable = {
  [key: string]: UnitGroups,
};

export type GroupGroup = {
  group_name: string,
  dates: { [key: string ]: boolean },
};

export type GroupHashTable = {
  [key: string]: GroupGroup,
};

export type DateGroup = {
  date: string,
  units: { [key: string ]: boolean },
}

export type DateHashTable = {
  [key: string]: DateGroup,
};

export type VisitationHashTable = {
  [key: string]: Visitation,
};

export type Visitation = {
  id?: number,
  zone_name: string,
  time_begin: string,
  time_end: string,
  duration_in: string,
};

export type Unit = {
  unit_name: string,
  group_name: string,
  data: Visitation[]
}

export type Store = {
  visitations: VisitationHashTable,
  dateGroups: DateHashTable,
  groupGroups: GroupHashTable,
  unitGroups: UnitHashTable,
}
