import { observer } from 'mobx-react';
import { NotifyItem } from '../NotifyItem';
import styles from './NotifyList.module.css';
import { notifyListService } from './notifyList.service';

export const NotifyList = observer(function NotifyList() {
  return (
    <div className={styles.notifyList}>
      {notifyListService.notifyList.map((notify) => (
        <NotifyItem notify={notify} key={notify.id} />
      ))}
    </div>
  );
});
