
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
