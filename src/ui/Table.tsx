import React from 'react';

import { StoreProvider } from './StoreContext';
import { GroupGroups } from './GroupGroups';

import './Table.css';

export const Table = () => {
  return (
    <StoreProvider>
      <table className="table">
        <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="25%" />
          <col width="10%" />
          <col width="25%" />
        </colgroup>
        <GroupGroups />
      </table>
    </StoreProvider>
  );
};
