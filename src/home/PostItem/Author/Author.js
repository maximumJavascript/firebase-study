import styles from './Author.module.css';
export default function Author(props) {
  return (
    <div className={styles.postAuthor}>
      <div className={styles.authorImg}>
        <img
          className={styles.authorImg__img}
          src={props.userPhoto}
          alt="img: Photo author post"
        />
      </div>
      <div className={styles.authorInfo}>
        <div className={styles.authorName}>@{props.userName}</div>
        <div className={styles.authorPostDate}>
          {new Date().toLocaleDateString('en', { dateStyle: 'medium' })}
        </div>
      </div>
    </div>
  );
}
