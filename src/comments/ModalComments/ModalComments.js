import { Modal } from '../../modal/Modal';
import { PostComments } from '../PostComments/PostComments';
import styles from './ModalComments.module.css';
import navStyles from '../../header/Navbar.module.css';
import cn from 'classnames';

export function ModalComments() {
  return (
    <Modal>
      <div className={styles.modalCommentsBackground}>
        <div className={cn(styles.modalCommentsWrapper, navStyles.navbarContainer)}>
          <PostComments />
        </div>
      </div>
    </Modal>
  );
}
