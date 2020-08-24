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
  name?: string | null;
  queryResults: any[];
};

const TreeNode: FunctionComponent<Props> = ({ node, name = null, type, queryResults }) => {
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
          {name}
        </span>
      );
    } else if (type === 'json') {
      subNode = (
        <span className="node-tree" onClick={toggleVisibility}>
          {visibilityIcon}
          {jsonIcon}
          {name}
          <CollapsedNode
            isVisible={isVisible || !!(name)}
            node={node}
          />
        </span>
      );
    }

    treeBranch = Object.keys(node).map((n) => {
      if (typeof node[n] === 'object') {
        return (
          <TreeNode
            key={n}
            node={node[n]}
            name={isNaN(Number(n)) ? n : null}
            type={Array.isArray(node[n]) ? 'list' : 'json'}
            queryResults={queryResults}
          />
        );
      }
      return <TreeNode key={n} node={node[n]} name={n} type='value' queryResults={queryResults} />;
    });

  } else {
    subNode = <span>{name} : {node}</span>;
  }

  return (
    <li className={clsx({ matched: getMatchStatus(queryResults, node) })}>
      {subNode}
      <ul className={clsx('node-list', { visible: isVisible })}>{treeBranch}</ul>
    </li>
  );
};

export default TreeNode;
