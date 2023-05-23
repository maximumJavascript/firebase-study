import { useEffect } from 'react';
import { Modal } from '../../modal';
import { PostComments } from '../PostComments';
import { ModalCloseButton } from '../../modal/ModalCloseButton';
import { useNavigate } from 'react-router-dom';
import styles from './ModalComments.module.css';

export function ModalComments() {
  const navigate = useNavigate();
  const handleClose = () => navigate('/');
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);
  return (
    <Modal>
      <div className={styles.modalCommentsBackground}>
        <div className={styles.modalCommentsWrapper}>
          <PostComments />
        </div>
        <ModalCloseButton onClose={handleClose} />
      </div>
    </Modal>
  );
}
