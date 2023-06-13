import { ReactComponent as SvgSignOut } from '../../../../assets/icons/SignOut.svg';
import cn from 'classnames';
import styles from './DropDownSignOut.module.css';
import { authService } from '../../../../auth/auth.service';

export function DropDownSignOut({ className, onClose }) {
  const cnWrap = cn(className, styles.wrap);
  const handleSignOut = () => {
    authService.handleLogOut();
    onClose();
  };

  return (
    <li className={cnWrap} onClick={handleSignOut}>
      <SvgSignOut className={styles.signOutIcon} />
      Sign out
    </li>
  );
}
