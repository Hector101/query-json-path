import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { useObserver } from 'mobx-react-lite';
import jsonpath from 'jsonpath';
import clsx from 'clsx';

import { useStore } from '../store';

import '../styles/Input.css';

type Props = {
  tree: any;
};

const Input: FunctionComponent<Props> = ({ tree }) => {
  const [inPutValue, setInputValue] = useState('');

  const { treeStore, uiStore } = useStore();

  const hanleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length > 1) {
      try {
        const results = jsonpath.query(tree, value);
        const resultCount = results.length;
  
        if (resultCount) {
          uiStore.setMatchFound(true);
          uiStore.setErrorMessage('');
          treeStore.setQueryResults(results);
        } else {
          uiStore.setMatchFound(false);
          uiStore.setErrorMessage('Query result not found');
          treeStore.setQueryResults([]);
        }

        uiStore.setIsInvalidExpression(false);
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

    setInputValue(event.target.value);
  };

  return useObserver(() => (
    <>
      <input
        className={clsx('input', { error: uiStore.isInvalidExpression })}
        placeholder="Type JSON Path expression here"
        value={inPutValue}
        onChange={hanleInputChange}
      />
      <span className="invalid-expression">{uiStore.errorMessage}</span>
    </>
  ))
}

export default Input;
