import React from 'react';
import { useObserver } from 'mobx-react-lite';
import clsx from 'clsx';
import _isEmpty from 'lodash/isEmpty';

import Tree from './Tree';
import UploadFile from './UploadFile';
import Input from './Input';

import { useStore } from '../store';

import '../styles/App.css';

function App() {
  const { treeStore, uiStore } = useStore();

  return useObserver(() => {
    const vSectionClassName = clsx('visualization-section', { 
      visible: !_isEmpty(treeStore.tree),
    });

    const treeSectionClassName = clsx('tree-section', {
      'match-found': uiStore.matchFound,
    });

    return (
      <div className="App">
        <UploadFile />
        <div className={vSectionClassName}>
          <Input tree={treeStore.tree} />
          <div className={treeSectionClassName}>
            <Tree />
          </div>
        </div>
      </div>
    )
  });
}

export default App;
