import { makeObservable, observable, runInAction } from 'mobx';
import { REMOVE_NOTIFY_TIME, STATUS } from '../../constants/notify';

class NotifyListService {
  notifyList = [];
  #maxId = 0;
  #notifyRemoveTimeouts = [];

  constructor() {
    makeObservable(this, {
      notifyList: observable,
    });
  }

  addNotify(text = '', status) {
    if (!(status in STATUS)) status = STATUS.ERROR;
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
