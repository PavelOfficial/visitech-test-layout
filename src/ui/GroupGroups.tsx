import React from 'react';

import { useStore } from './StoreContext';

export const GroupGroups = () => {
  const store = useStore();

  return (
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
  );
}
