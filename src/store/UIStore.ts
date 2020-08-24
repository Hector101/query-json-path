import { observable, action } from 'mobx';

export class UIStore {
  @observable errorMessage = '';
  @observable isInvalidExpression = false;
  @observable matchFound = false;

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
}
