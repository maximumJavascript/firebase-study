import styles from './NotifyItem.module.css';
import cn from 'classnames';
import { notifyListService } from '../NotifyList/notifyList.service';
import { NotifyIcon } from '../NotifyIcon';
import { animated, useSpring, config } from '@react-spring/web';
import { useRef } from 'react';

export function NotifyItem({ notify = {} }) {
  const { text, status } = notify;
  const handleClose = () => {
    notifyListService.removeNotify(notify.id);
  };

  const notifyCn = cn(styles.notify, styles[status]);

  const springConfig = useSpring({
    from: { height: '0' },
    to: { height: '100%' },
    config: config.molasses,
  });

  return (
    <animated.div style={springConfig} className={notifyCn} onClick={handleClose}>
      <div className={styles.iconWrap}>
        <NotifyIcon status={status} className={styles.icon} />
      </div>
      <div className={styles.notifyTextContainer}>{text}</div>
    </animated.div>
  );
}
