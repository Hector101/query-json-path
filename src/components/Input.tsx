import React, { FunctionComponent, ChangeEvent } from 'react';
import { useObserver } from 'mobx-react-lite';
import jsonpath from 'jsonpath';
import clsx from 'clsx';

import { useStore } from '../store';
import { getCurrentRootName } from '../utils';

import '../styles/Input.css';

type Props = {
  tree: any;
};

const Input: FunctionComponent<Props> = ({ tree }) => {
  const { treeStore, uiStore } = useStore();

  const handleQuery = (value: string) => {
    if (value) {
      try {
        const results = jsonpath.query(tree, value);
        const path = jsonpath.parse(value);

        const resultCount = results.length;
  
        if (resultCount) {
          uiStore.setMatchFound(true);
          uiStore.setErrorMessage('');
          uiStore.setIsInvalidExpression(false);
          treeStore.setQueryResults(results);
        } else {
          uiStore.setMatchFound(false);
          uiStore.setErrorMessage('Query result not found');
          uiStore.setIsInvalidExpression(true);
          treeStore.setQueryResults([]);
        }

        getCurrentRootName(path, (pathName) => {
          if (pathName) {
            treeStore.setCurrentRootName(pathName);
          }
        });
      } catch (e) {
        uiStore.setMatchFound(false);
        uiStore.setIsInvalidExpression(true);
        uiStore.setErrorMessage('Provide a valid JSON Path expression');
      }
    } else {
      uiStore.setMatchFound(false);
      uiStore.setIsInvalidExpression(false);
      uiStore.setErrorMessage('');
      treeStore.setQueryResults([]);
    }
  };

  const hanleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    handleQuery(value);
  
    uiStore.setInputValue(event.target.value);
  };

  return useObserver(() => (
    <>
      <input
        className={clsx('input', { error: uiStore.isInvalidExpression })}
        placeholder="Type your JSON Path expression here"
        value={uiStore.inPutValue}
        onChange={hanleInputChange}
      />
      <span className="invalid-expression">{uiStore.errorMessage}</span>
    </>
  ))
}

export default Input;
