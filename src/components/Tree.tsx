import React, { FunctionComponent } from 'react';
import { useObserver } from 'mobx-react-lite';

import TreeNode from './TreeNode';

import { useStore } from '../store';

import '../styles/Tree.css';

const Tree: FunctionComponent<{}> = () => {
  const { treeStore } = useStore();
    
  return useObserver(() => (
    <ul>
      {
        Object.keys(treeStore.tree).map((t: string) => (
          <TreeNode
            key={t}
            node={treeStore.tree[t]}
            name={isNaN(Number(t)) ? t : null}
            type="json"
            queryResults={treeStore.queryResults}
          />
        ))
      }
    </ul>
  ));
}

export default Tree;
