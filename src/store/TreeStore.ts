import { observable, action } from 'mobx';

export class TreeStore {
  @observable tree: any = {};
  @observable queryResults: any[] = [];
  @observable currentPathName = '';

  @action
  loadTree(file: File, onComplete?: () => void) {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, 'UTF-8');
  
      fileReader.onload = (event) => {
        this.tree = JSON.parse(event.target?.result as string);
      };
    }

    if (onComplete) {
      onComplete();
    }
  }

  @action
  setQueryResults(results: any[]) {
    this.queryResults = results;
  }

  @action
  setCurrentPathName(name: string) {
    this.currentPathName = name;
  }

  @action
  resetStore() {
    this.queryResults = [];
    this.currentPathName = '';
  }
}
