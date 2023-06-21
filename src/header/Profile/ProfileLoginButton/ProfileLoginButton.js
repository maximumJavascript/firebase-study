import { Link } from 'react-router-dom';
import { ButtonUI } from '../../../controls/ButtonUI';
import styles from './ProfileLoginButton.module.css';

export function ProfileLoginButton() {
  return (
    <ButtonUI className={styles.loginBtn}>
      <Link to="/login">Login</Link>
    </ButtonUI>
  );
}
