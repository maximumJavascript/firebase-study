import { makeObservable, observable } from 'mobx';

class NotifyService {
  notify = [];
  constructor() {
    makeObservable(this, {
      notify: observable,
    });
  }
}

export const notifyService = new NotifyService();
