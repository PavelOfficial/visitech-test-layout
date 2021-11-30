import React from 'react';

import { StoreProvider } from './StoreContext';
import { GroupGroups } from './GroupGroups';

const Table = () => {
  return (
    <StoreProvider>
      <table>
        <GroupGroups />
      </table>
    </StoreProvider>
  );
};
