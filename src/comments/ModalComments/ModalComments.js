import { useEffect } from 'react';
import { Modal } from '../../modal';
import { PostComments } from '../PostComments';
import { ModalCloseButton } from '../../modal/ModalCloseButton';
import { useNavigate } from 'react-router-dom';
import styles from './ModalComments.module.css';
import { animated, config, useSpring } from '@react-spring/web';

export function ModalComments() {
  const navigate = useNavigate();
  const handleClose = () => navigate('/');
  const springStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.slow,
  });
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);
  return (
    <Modal>
      <animated.div style={springStyle} className={styles.modalCommentsBackground}>
        <div className={styles.modalCommentsWrapper}>
          <PostComments />
        </div>
        <ModalCloseButton onClose={handleClose} />
      </animated.div>
    </Modal>
  );
}
