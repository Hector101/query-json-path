
import _isEqual from 'lodash/isEqual';

export const getMatchStatus = (queryResults: any[], node: any) => {
  let status = false;

  for (let i = 0; i < queryResults.length; i++) {
    if (_isEqual(queryResults[i], node)) {
      status = true;
      break;
    }
  }
  return status;
};

export const getCurrentRootName = (path: any[], cb: (pathName?: string) => void) => {
  for (let i = path.length; i-- > 0;) {
    if (path[i].expression.type === 'identifier') {
      return cb(path[i].expression.value);
    }
  }
  cb();
};

export const getNodeType = (node: any[] | any) => {
  return Array.isArray(node) ? 'list' : 'json';
}

export const getTreeName = (nodeName: string) => {
  return isNaN(Number(nodeName)) ? nodeName : null;
}
