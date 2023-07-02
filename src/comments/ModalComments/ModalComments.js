import { useEffect, useRef, useState } from 'react';
import { Modal } from '../../modal';
import { PostComments } from '../PostComments';
import { ModalCloseButton } from '../../modal/ModalCloseButton';
import styles from './ModalComments.module.css';
import { useNavigate } from 'react-router-dom';

export function ModalComments() {
  const [isClose, setIsClose] = useState(false);
  const navigate = useNavigate();

  const ref = useRef(null);

  const handleClose = () => {
    if (isClose) return;
    setIsClose(true);
    navigate('/');
  };

  const handleModalClick = (e) => {
    if (!ref.current?.contains(e.target)) handleClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  return (
    <Modal>
      <div className={styles.modalCommentsBackground} onClick={handleModalClick}>
        <div className={styles.modalCommentsWrapper}>
          <PostComments isClose={isClose} myRef={ref} />
        </div>
        <ModalCloseButton onClick={handleClose} />
      </div>
    </Modal>
  );
}
