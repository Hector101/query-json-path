import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';

import CollapsedNode from './CollapsedNode';

import { getMatchStatus, getNodeType, getTreeName } from '../utils';

import { ReactComponent as DownArrowIcon } from '../svgs/down-arrow.svg';
import { ReactComponent as RightArrowIcon } from '../svgs/right-arrow.svg';
import { ReactComponent as JsonIcon } from '../svgs/json.svg';
import { ReactComponent as ListIcon } from '../svgs/list.svg';

import '../styles/TreeNode.css';

type Props = {
  node: any;
  nodeType: 'list' | 'json' | 'value';
  treeName?: string | null;
  queryResults: any[];
  currentRootName: string;
  isMatched: boolean;
};

const TreeNode: FunctionComponent<Props> = ({
  node,
  treeName = null,
  nodeType,
  queryResults,
  currentRootName,
  isMatched,
}) => {
  let subNode;
  let treeBranch;
  
  const [isVisible, setIsVisible] = useState(true);

  const visibilityIcon = isVisible
    ? <DownArrowIcon className="icon" />
    : <RightArrowIcon className="icon" />;
  
  const jsonIcon = <JsonIcon className="icon" />;
  const listIcon = <ListIcon className="icon" />;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  if (nodeType !== 'value') {

    if (nodeType === 'list') {
      subNode = (
        <span className="node-tree" onClick={toggleVisibility}>
          {visibilityIcon}
          {listIcon}
          {treeName}
        </span>
      );
    } else if (nodeType === 'json') {
      subNode = (
        <span className="node-tree" onClick={toggleVisibility}>
          {visibilityIcon}
          {jsonIcon}
          {treeName}
          <CollapsedNode
            isVisible={isVisible || !!(treeName)}
            node={node}
          />
        </span>
      );
    }

    treeBranch = Object.keys(node).map((nodeName) => {
      if (typeof node[nodeName] === 'object') {
        return (
          <TreeNode
            key={nodeName}
            node={node[nodeName]}
            treeName={getTreeName(nodeName)}
            nodeType={getNodeType(node[nodeName])}
            queryResults={queryResults}
            currentRootName={currentRootName}
            isMatched={isMatched || currentRootName === nodeName}
          />
        );
      }
      return (
        <TreeNode
          key={nodeName}
          node={node[nodeName]}
          treeName={nodeName}
          nodeType='value'
          queryResults={queryResults}
          currentRootName={currentRootName}
          isMatched={isMatched || currentRootName === nodeName}
        />
      );
    });

  } else {
    subNode = <span className="key-value"><span className="key">{treeName}</span> : {node}</span>;
  }

  return (
    <li
      className={clsx({
        matched: isMatched
          ? getMatchStatus(queryResults, node)
          : false 
        }
      )}>
      {subNode}
      <ul className={clsx('node-list', { visible: isVisible })}>{treeBranch}</ul>
    </li>
  );
};

export default TreeNode;
