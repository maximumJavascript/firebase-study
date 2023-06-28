import styles from './NotifyItem.module.css';
import cn from 'classnames';
import { notifyListService } from '../NotifyList/notifyList.service';
import { NotifyIcon } from '../NotifyIcon';

export function NotifyItem({ notify = {} }) {
  const { text, status } = notify;
  const handleClose = () => {
    notifyListService.removeNotify(notify.id);
  };
  const notifyCn = cn(styles.notify, styles[status]);
  return (
    <div className={notifyCn} onClick={handleClose}>
      <div className={styles.iconWrap}>
        <NotifyIcon status={status} />
      </div>
      <div className={styles.notifyTextContainer}>{text}</div>
    </div>
  );
}
