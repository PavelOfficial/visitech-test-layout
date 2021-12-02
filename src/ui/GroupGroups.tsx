import React from 'react';

import { useStore } from './StoreContext';
import { GroupGroup } from './data/types';
import { Collapser } from './Collapser';
import { Group } from './Group';



const renderHeader:(group: GroupGroup) => React.ReactNode = (group) => {
  return (
    <tr className='group-statistic'>
      <th>{group.group_name}</th>
      <th></th>
      <th></th>
      <th></th>
      <th>ВСЕГО ВРЕМЕНИ:</th>
      <th></th>
      <th>{group.duration}</th>
    </tr>
  );
};

const renderGroup = (group: GroupGroup) => {
  return (
    <Group
      group_name={group.group_name}
    />
  );
};

export const GroupGroups = () => {
  const store = useStore();

  const groups = store.selectGroups();
  const fullDuration = store.selectFullDuration();

  return (
    <>
      <thead>
        <tr className='all-statistic'>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>ВСЕГО ВРЕМЕНИ:</th>
          <th></th>
          <th>{fullDuration}</th>
        </tr>
      </thead>
      {groups.map((group) => {
        return (
          <Collapser
            key={group.group_name}
            value={group}
            renderHeader={renderHeader}
          >
            {renderGroup}
          </Collapser>
        );
      })}
    </>
  );
}
