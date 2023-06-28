import { makeObservable, observable, runInAction } from 'mobx';
import { STATUS } from '../../constants/notify';

class NotifyListService {
  notifyList = [];

  constructor() {
    makeObservable(this, {
      notifyList: observable,
    });
  }

  addNotify(title = '', text = '', status) {
    if (!(status in STATUS)) status = STATUS.UNSUCCESSFULLY;
    const cId = this.notifyList.length + 1;
    const notifyObj = {
      id: cId,
      title,
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
