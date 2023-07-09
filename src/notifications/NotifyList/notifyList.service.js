import { makeObservable, observable, runInAction } from 'mobx';
import { STATUS } from '../../constants/notify';

class NotifyListService {
  notifyList = [];
  #maxId = 0;

  constructor() {
    makeObservable(this, {
      notifyList: observable,
    });
  }

  get #nextId() {
    return this.#maxId++;
  }

  addSuccess(text = '') {
    const notifyObj = {
      id: this.#nextId,
      text,
      status: STATUS.SUCCESSFULLY,
    };
    runInAction(() => this.notifyList.push(notifyObj));
  }

  addError(text = '') {
    const notifyObj = {
      id: this.#nextId,
      text,
      status: STATUS.ERROR,
    };
    runInAction(() => this.notifyList.push(notifyObj));
  }

  removeNotify(notifyId) {
    const filteredNotifyList = this.notifyList.filter(({ id }) => id !== notifyId);
    runInAction(() => (this.notifyList = filteredNotifyList));
  }
}

export const notifyListService = new NotifyListService();
