import React from 'react';

import { useStore } from './StoreContext';
import { Collapser } from './Collapser';
import { DateComponent } from './Date';
import { DateGroup } from './data/types';

type Props = {
  group_name: string,
};

const renderHeader:({ date }: any) => React.ReactNode = ({ date }) => {
  return (
    <tr className='date-statistic'>
      <th></th>
      <th>{date.date}</th>
      <th></th>
      <th></th>
      <th>ВСЕГО ЗА {date.date} ВРЕМЕНИ:</th>
      <th></th>
      <th>{date.duration}</th>
    </tr>
  );
};

const renderDate = ({ date, group_name }: { date: DateGroup, group_name: string }) => {
  return (
    <DateComponent
      group_name={group_name}
      date={date.date}
    />
  );
}

const renderList = (dates:  DateGroup[], group_name: string) => {
  return dates.map((date) => {
    return (
      <Collapser
        key={date.date}
        renderHeader={renderHeader}
        value={{ date, group_name }}
      >
        {renderDate}
      </Collapser>
    );
  });
}

export const Group = ({ group_name }: Props) => {
  const store = useStore();
  const dates = store.selectDates(group_name);

  return (
    <>
      {renderList(dates, group_name)}
    </>
  );
};
