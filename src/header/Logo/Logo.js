import { Link } from 'react-router-dom';
import srcLogoWithText from '../../assets/logo/logo-with-text.png';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <div className={styles.logoWrap}>
      <Link to="/">
        <img className={styles.logoImg} src={srcLogoWithText} alt="" />
      </Link>
    </div>
  );
}
