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
        Object.keys(treeStore.tree).map((treeName: string) => (
          <TreeNode
            key={treeName}
            node={treeStore.tree[treeName]}
            treeName={isNaN(Number(treeName)) ? treeName : null}
            type="json"
            queryResults={treeStore.queryResults}
            currentPathName={treeStore.currentPathName}
            isMatched={Array.isArray(treeStore.tree) || treeStore.currentPathName === treeName}
          />
        ))
      }
    </ul>
  ));
}

export default Tree;
