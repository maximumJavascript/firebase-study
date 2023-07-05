import styles from './NotifyItem.module.css';
import cn from 'classnames';
import { notifyListService } from '../NotifyList/notifyList.service';
import { NotifyIcon } from '../NotifyIcon';
import { animated, useSpring, config } from '@react-spring/web';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { REMOVE_NOTIFY_TIME } from '../../constants/notify';

export function NotifyItem({
  notify = {},
  autoClose = true,
  timeoutMS = REMOVE_NOTIFY_TIME,
}) {
  const [isForceUpdate, forceUpdate] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const ref = useRef(null);
  const componentStyles = useRef(null);
  const closeTimeout = useRef(null);

  useLayoutEffect(() => {
    const computedStyle = window.getComputedStyle(ref.current);

    componentStyles.current = {
      height: ref.current.offsetHeight ? ref.current.offsetHeight + 'px' : '0px',
      paddingTop: computedStyle['padding-top'],
      paddingBottom: computedStyle['padding-bottom'],
    };
    forceUpdate(true);
  }, []);

  useEffect(() => {
    if (autoClose) {
      closeTimeout.current = setTimeout(() => {
        handleClose();
      }, timeoutMS);
      return () => clearTimeout(closeTimeout.current);
    }
  }, [autoClose]);

  const handleClose = () => {
    setIsClose(true);
  };

  const handleDeleteNotify = () => {
    notifyListService.removeNotify(notify.id);
  };

  const { text, status } = notify;
  const notifyCn = cn(styles.notify, styles[status]);

  const springConfig = useSpring({
    from: {
      height: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      marginTop: '0px',
      opacity: 0,
    },
    to: {
      height: isClose ? '0px' : componentStyles.current?.height || '0px',
      paddingTop: isClose ? '0px' : componentStyles.current?.paddingTop || '0px',
      paddingBottom: isClose ? '0px' : componentStyles.current?.paddingBottom || '0px',
      marginTop: isClose ? '0px' : '10px',
      opacity: isClose ? 0 : 1,
    },
    config: config.stiff,
    onRest() {
      if (isClose) handleDeleteNotify();
    },
  });

  const style = isForceUpdate ? springConfig : {};
  return (
    <animated.div style={style} className={notifyCn} onClick={handleClose} ref={ref}>
      <div className={styles.iconWrap}>
        <NotifyIcon status={status} className={styles.icon} />
      </div>
      <div className={styles.notifyTextContainer}>{text}</div>
    </animated.div>
  );
}
