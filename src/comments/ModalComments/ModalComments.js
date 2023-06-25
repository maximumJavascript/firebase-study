import { useEffect, useState } from 'react';
import { Modal } from '../../modal';
import { PostComments } from '../PostComments';
import { ModalCloseButton } from '../../modal/ModalCloseButton';
import styles from './ModalComments.module.css';
import { useNavigate } from 'react-router-dom';

export function ModalComments() {
  const [isClose, setIsClose] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsClose(true);
    navigate('/');
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  return (
    <Modal>
      <div className={styles.modalCommentsBackground}>
        <div className={styles.modalCommentsWrapper}>
          <PostComments isClose={isClose} />
        </div>
        <ModalCloseButton onClose={handleClose} />
      </div>
    </Modal>
  );
}
