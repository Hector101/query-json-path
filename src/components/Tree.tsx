import React, { FunctionComponent } from 'react';
import { useObserver } from 'mobx-react-lite';

import TreeNode from './TreeNode';

import { getTreeName } from '../utils';

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
            treeName={getTreeName(treeName)}
            nodeType="json"
            queryResults={treeStore.queryResults}
            currentRootName={treeStore.currentRootName}
            isMatched={Array.isArray(treeStore.tree) || treeStore.currentRootName === treeName}
          />
        ))
      }
    </ul>
  ));
}

export default Tree;
