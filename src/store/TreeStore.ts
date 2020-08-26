import { observable, action } from 'mobx';

export class TreeStore {
  @observable tree: any = {};
  @observable queryResults: any[] = [];
  @observable currentRootName = '';

  @action
  loadTree(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');

    fileReader.onload = (event) => {
      this.tree = JSON.parse(event.target?.result as string);
    };
  }

  @action
  setQueryResults(results: any[]) {
    this.queryResults = results;
  }

  @action
  setCurrentRootName(name: string) {
    this.currentRootName = name;
  }

  @action
  resetStore() {
    this.tree = {};
    this.queryResults = [];
    this.currentRootName = '';
  }
}
