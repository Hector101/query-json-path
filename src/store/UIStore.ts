import { observable, action } from 'mobx';

export class UIStore {
  @observable errorMessage = '';
  @observable isInvalidExpression = false;
  @observable matchFound = false;
  @observable inPutValue = '';

  @action
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  @action
  setIsInvalidExpression(status: boolean) {
    this.isInvalidExpression = status;
  }

  @action
  setMatchFound(status: boolean) {
    this.matchFound = status;
  }

  @action
  setInputValue(value: string) {
    this.inPutValue = value;
  }

  @action
  resetStore() {
    this.errorMessage = '';
    this.isInvalidExpression = false;
    this.matchFound = false;
    this.inPutValue = '';
  }
}
