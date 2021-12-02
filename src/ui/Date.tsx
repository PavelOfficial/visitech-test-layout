import React from 'react';

import { useStore } from './StoreContext';
import { Collapser } from './Collapser';
import { Unit } from './Unit';
import { DateGroup, UnitGroup } from './data/types';

const renderHeader:({ unit }: any) => React.ReactNode = ({ unit }) => {
  return (
    <>
      <tr className='unit-statistic'>
        <th></th>
        <th></th>
        <th>{unit.unit_name}</th>
        <th></th>
        <th>МИН В ДЕНЬ ПО ЮНИТУ: {unit.minDuration}</th>
        <th>МАКС В ДЕНЬ ПО ЮНИТУ: {unit.maxDuration}</th>
        <th>ОБЩЕЕ В ДЕНЬ ПО ЮНИТУ: {unit.duration}</th>
      </tr>
    </>
  );
};

type RenderUnitOptions = { unit: UnitGroup, date: string, group_name: string };
const renderUnit = ({ unit, date, group_name }: RenderUnitOptions) => {
  return (
    <Unit
      unit_name={unit.unit_name}
      group_name={group_name}
      date={date}
    />
  );
}

const renderList = (units:  UnitGroup[], group_name: string, date: string) => {
  return units.map((unit) => {
    return (
      <Collapser
        key={unit.unit_name}
        renderHeader={renderHeader}
        value={{ unit, date, group_name }}
      >
        {renderUnit}
      </Collapser>
    );
  });
}

const renderDateHeader = () => {
  return (
    <tr className='unit-statistic-header'>
      <th></th>
      <th></th>
      <th>ЮНИТ (unit_name)</th>
      <th>ЗОНА (zone_name)</th>
      <th>ВРЕМЯ ВХОДА (time_begin)</th>
      <th>ВРЕМЯ ВЫХОДА (time_end)</th>
      <th>ВРЕМЯ НАХОЖДЕНИЯ (duration_in)</th>
    </tr>
  );
};


type Props = {
  group_name: string,
  date: string,
};

export const DateComponent = ({ group_name, date }: Props) => {
  const store = useStore();
  const units = store.selectUnits(group_name, date);

  return (
    <>
      {renderDateHeader()}
      {renderList(units, group_name, date)}
    </>
  );
};
