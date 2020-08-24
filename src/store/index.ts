import React, { createContext } from 'react';

import { TreeStore } from './TreeStore';
import { UIStore } from './UIStore';

const storesContext = createContext({
  treeStore: new TreeStore(),
  uiStore: new UIStore(),
});

export const useStore = () => React.useContext(storesContext);
