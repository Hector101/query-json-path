import React, { FunctionComponent } from 'react';

type Props = {
  node: any;
  isVisible: boolean;
};

const CollapsedNode: FunctionComponent<Props> = ({ node, isVisible }) => {
  if(isVisible) {
    return null
  }

  return (
    <span>{Object.keys(node).map((n, i) => {
      if (i < 1) {
        return `{ ${n} : ${node[n]}, .. }`;
      }
      return null;
    })}</span>
  )
}

export default CollapsedNode;
