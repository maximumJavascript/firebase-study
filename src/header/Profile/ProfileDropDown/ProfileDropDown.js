import { useEffect } from 'react';
import styles from './ProfileDropDown.module.css';
import { DropDownSignOut } from './DropDownSignOut';

export function ProfileDropDown({ onClose, wrapRef }) {
  const handleClose = (e) => {
    if (wrapRef.current.contains(e.target)) return;
    onClose();
  };
  useEffect(() => {
    document.addEventListener('click', handleClose, true);
    return () => document.removeEventListener('click', handleClose, true);
  }, []);
  return (
    <div className={styles.wrapper}>
      <ul className={styles.dropDownList}>
        <DropDownSignOut className={styles.dropDownItem} onClose={onClose} />
      </ul>
    </div>
  );
}
