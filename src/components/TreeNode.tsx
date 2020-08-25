import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';

import CollapsedNode from './CollapsedNode';

import { getMatchStatus } from '../utils';

import { ReactComponent as DownArrowIcon } from '../svgs/down-arrow.svg';
import { ReactComponent as RightArrowIcon } from '../svgs/right-arrow.svg';
import { ReactComponent as JsonIcon } from '../svgs/json.svg';
import { ReactComponent as ListIcon } from '../svgs/list.svg';

import '../styles/TreeNode.css';

type Props = {
  node: any;
  type: 'list' | 'json' | 'value';
  treeName?: string | null;
  queryResults: any[];
  currentPathName: string;
  isMatched: boolean;
};

const TreeNode: FunctionComponent<Props> = ({
  node,
  treeName = null,
  type,
  queryResults,
  currentPathName,
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
  
  if (type !== 'value') {

    if (type === 'list') {
      subNode = (
        <span className="node-tree" onClick={toggleVisibility}>
          {visibilityIcon}
          {listIcon}
          {treeName}
        </span>
      );
    } else if (type === 'json') {
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
            treeName={isNaN(Number(nodeName)) ? nodeName : null}
            type={Array.isArray(node[nodeName]) ? 'list' : 'json'}
            queryResults={queryResults}
            currentPathName={currentPathName}
            isMatched={isMatched || currentPathName === nodeName}
          />
        );
      }
      return (
        <TreeNode
          key={nodeName}
          node={node[nodeName]}
          treeName={nodeName}
          type='value'
          queryResults={queryResults}
          currentPathName={currentPathName}
          isMatched={isMatched || currentPathName === nodeName}
        />
      );
    });

  } else {
    subNode = <span>{treeName} : {node}</span>;
  }

  let matched = false;

  if (isMatched) {
    matched = getMatchStatus(queryResults, node);
  }

  return (
    <li className={clsx({ matched })}>
      {subNode}
      <ul className={clsx('node-list', { visible: isVisible })}>{treeBranch}</ul>
    </li>
  );
};

export default TreeNode;
