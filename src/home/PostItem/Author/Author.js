import styles from './Author.module.css';
import { authService } from '../../../auth/auth.service';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

export default function Author(props) {
  let noPhotoSrc = 'https://medasco.ru/data/uploads/no-image-900x.jpg';

  return (
    <div className={styles.postAuthor}>
      <div className={styles.authorImg}>
        <img
          className={styles.authorImg__img}
          src={noPhotoSrc}
          alt="img: Photo author post"
        />
      </div>
      <div className={styles.authorInfo}>
        <div className={styles.authorName}>@{props.name}</div>
        <div className={styles.authorPostDate}>
          {new Date().toLocaleDateString('en', { dateStyle: 'medium' })}
        </div>
      </div>
    </div>
  );
}
