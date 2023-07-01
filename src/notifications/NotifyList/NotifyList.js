import { observer } from 'mobx-react';
import { NotifyItem } from '../NotifyItem';
import styles from './NotifyList.module.css';
import { notifyListService } from './notifyList.service';
import { useEffect, useRef, useState } from 'react';

export const NotifyList = observer(function NotifyList() {
  const [isUserHover, setIsUserHover] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = () => {
    setIsUserHover(true);
  };
  const handleMouseLeave = () => {
    setIsUserHover(false);
  };

  useEffect(() => {
    const elem = ref.current;
    elem.addEventListener('mouseenter', handleMouseEnter);
    elem.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      elem.removeEventListener('mouseenter', handleMouseEnter);
      elem.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.notifyList} ref={ref}>
      {notifyListService.notifyList.map((notify) => (
        <NotifyItem notify={notify} key={notify.id} autoClose={!isUserHover} />
      ))}
    </div>
  );
});
