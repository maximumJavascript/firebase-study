import { Link } from 'react-router-dom';
import { CommentLoginButton } from '../../../controls/CommentLoginButton/CommentLoginButton';
import styles from './ProfileLoginButton.module.css';

export function ProfileLoginButton() {
  return (
    <CommentLoginButton className={styles.loginBtn}>
      <Link to="/login">Login</Link>
    </CommentLoginButton>
  );
}
