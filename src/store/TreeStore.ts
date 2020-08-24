import { observable, action } from 'mobx';

export class TreeStore {
  @observable tree: any = {};
  @observable queryResults: any[] = [];

  @action
  loadTree(file: File) {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, 'UTF-8');
  
      fileReader.onload = (event) => {
        this.tree = JSON.parse(event.target?.result as string);
      };
    }
  }

  @action
  setQueryResults(results: any[]) {
    this.queryResults = results;
  }
}
