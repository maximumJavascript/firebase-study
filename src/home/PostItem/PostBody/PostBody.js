import styles from './PostBody.module.css';

export function PostBody({ title = '', text = '' }) {
  return (
    <div className={styles.postBodyText}>
      <div className={styles.postTitle}>{title}</div>
      <div className={styles.postTextContainer}>{text}</div>
    </div>
  );
}
