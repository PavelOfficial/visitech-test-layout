import React from 'react';

import { useStore } from './StoreContext';
import { Collapser } from './Collapser';
import { Unit } from './Unit';
import { DateGroup, UnitGroup } from './data/types';

const renderHeader:({ unit }: any) => React.ReactNode = ({ unit }) => {
  return (
    <>
      <th>
        <td></td>
        <td></td>
        <td>{unit.unit_name}</td>
        <td></td>
        <td>МИН В ДЕНЬ ПО ЮНИТУ: {unit.minDuration}</td>
        <td>МАКС В ДЕНЬ ПО ЮНИТУ: {unit.maxDuration}</td>
        <td>ОБЩЕЕ В ДЕНЬ ПО ЮНИТУ: {unit.duration}</td>
      </th>
    </>
  );
};

type RenderUnitOptions = { unit: UnitGroup, date: DateGroup, group_name: string };
const renderUnit = ({ unit, date, group_name }: RenderUnitOptions) => {
  return (
    <Unit
      unit_name={unit.unit_name}
      group_name={group_name}
      date={date.date}
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
    <th>
      <td></td>
      <td></td>
      <td>ЮНИТ (unit_name)</td>
      <td>ЗОНА (zone_name)</td>
      <td>ВРЕМЯ ВХОДА (time_begin)</td>
      <td>ВРЕМЯ ВЫХОДА (time_end)</td>
      <td>ВРЕМЯ НАХОЖДЕНИЯ (duration_in)</td>
    </th>
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
