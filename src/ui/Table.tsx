import React from 'react';

import { StoreProvider } from './StoreContext';
import { GroupGroups } from './GroupGroups';

export const Table = () => {
  return (
    <StoreProvider>
      <table>
        <GroupGroups />
      </table>
    </StoreProvider>
  );
};
