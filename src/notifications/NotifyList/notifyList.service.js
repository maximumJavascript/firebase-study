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

  addNotify(text = '', status) {
    if (!Object.values(STATUS).includes(status)) status = STATUS.ERROR;
    const cId = this.#maxId++;
    const notifyObj = {
      id: cId,
      text,
      status,
    };

    runInAction(() => this.notifyList.push(notifyObj));
  }

  removeNotify(notifyId) {
    const filteredNotifyList = this.notifyList.filter(({ id }) => id !== notifyId);
    runInAction(() => (this.notifyList = filteredNotifyList));
  }
}

export const notifyListService = new NotifyListService();
