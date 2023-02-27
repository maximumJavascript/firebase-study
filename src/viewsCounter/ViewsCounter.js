import { makeAutoObservable } from 'mobx';
class ViewsCounter {
  viewsCounter = 10;
  constructor() {
    makeAutoObservable(this);
  }
  increment = () => {
    this.viewsCounter = this.viewsCounter + 1;
  };
}

export const viewsCounter = new ViewsCounter();
