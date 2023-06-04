import { useEffect, useRef, useState } from 'react';
import { Modal } from '../../modal';
import { PostComments } from '../PostComments';
import { ModalCloseButton } from '../../modal/ModalCloseButton';
import { useNavigate } from 'react-router-dom';
import styles from './ModalComments.module.css';
import { animated, config, useSpring } from '@react-spring/web';

export function ModalComments() {
  const [isClose, setIsClose] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setIsClose(true);
    document.body.style.overflow = 'auto';
  };
  const springStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: isClose ? 0 : 1 },
    config: isClose ? { ...config.gentle, duration: 200 } : config.slow,
    onRest: () => {
      if (!isClose) return;
      navigate('/');
    },
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
