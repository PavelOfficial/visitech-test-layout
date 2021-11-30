import React, { FunctionComponent, useContext } from 'react';

import unitsRaw from './data/data.json';
import { createStore } from './data/createStore';

import { Unit } from './data/types';
import { Store } from './data/store';

const units = unitsRaw as unknown as Unit[];
const store = createStore(units);

const Context = React.createContext(new Store());

export const useStore = () => {
  const store = useContext(Context);

  return store;
};

export const StoreProvider: FunctionComponent<{}> = ({ children}) => {
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}
