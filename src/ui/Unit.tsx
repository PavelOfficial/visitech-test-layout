import React from 'react';

import { useStore } from './StoreContext';
import { VisitationComponent } from './Visitation';
import { Visitation } from './data/types';

const renderList = (visitations:  Visitation[]) => {
  return visitations.map((visitation) => {
    return (
      <VisitationComponent
        visitation={visitation}
      />
    );
  });
}

type Props = {
  group_name: string,
  date: string,
  unit_name: string,
};

export const UnitComponent = ({ group_name, date, unit_name }: Props) => {
  const store = useStore();
  const visitations = store.selectVisitations(group_name, date, unit_name);

  return (
    <>
      {renderList(visitations)}
    </>
  );
};

export const Unit = React.memo(UnitComponent);
