import React, {useCallback} from 'react';

import { useStore } from './StoreContext';
import { GroupGroup } from './data/types';
import { Collapser } from './Collapser';
import { Group } from './Group';

const renderHeader:(group: GroupGroup) => React.ReactNode = (group) => {
  return (
    <th>
      <td>{group.group_name}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>ВСЕГО ВРЕМЕНИ:</td>
      <td></td>
      <td>{group.duration}</td>
    </th>
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
      <tbody>
        <th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>ВСЕГО ВРЕМЕНИ:</td>
          <td></td>
          <td>{fullDuration}</td>
        </th>
      </tbody>
      <tbody>
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
      </tbody>
    </>
  );
}
