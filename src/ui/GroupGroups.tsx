import React, {useCallback} from 'react';

import { useStore } from './StoreContext';
import { GroupGroup } from './data/types';
import { Collapser } from './Collapser';


type Props = {
  group: GroupGroup
}

const Group = ({ group }: Props) => {
  return (

  );
};


const renderGroupHeader:() => React.ReactNode = () => {
  return (
    <th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>ВСЕГО ВРЕМЕНИ:</td>
      <td></td>
      <td>{value}</td>
    </th>
  );
};

export const GroupGroups = () => {
  const store = useStore();

  const groups = store.selectGroups();

  const renderHeaderWrapper = useCallback((handleSwitch) => {
    return renderGroupHeader(renderGroupHeader);
  }, []);

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
          <td>{value}</td>
        </th>
      </tbody>
        {groups.map((group) => {
          return (
            <Collapser renderHeader={renderGroupHeader}>
              <Group
                key={group.group_name}
                group={group}
              />
            </Collapser>
          );
        })}
        <th>
          <td>

          </td>
          <td>

          </td>
          <td>

          </td>
          <td>

          </td>
          <td>

          </td>
          <td>

          </td>
          <td>

          </td>
        </th>
      </tbody>
    </>
  );
}
