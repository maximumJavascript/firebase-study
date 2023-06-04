import { useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/icons/CloseIcon.svg';
import styles from './ModalCloseButton.module.css';

export function ModalCloseButton({ onClose }) {
  const handleClose = () => onClose?.();
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleClose();
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  });
  return (
    <button type="button" className={styles.closeButton} onClick={handleClose}>
      <CloseIcon />
    </button>
  );
}
