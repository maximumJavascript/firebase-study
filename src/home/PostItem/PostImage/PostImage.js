import styles from './PostImage.module.css';

export function PostImage({ src }) {
  return (
    <div className={styles.postImage}>
      <img src={src} alt="post: img" />
    </div>
  );
}
