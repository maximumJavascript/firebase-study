import styles from './PostImage.module.css';

export function PostImage({ src, withComments }) {
  const className = withComments ? styles.postWithCommentsImage : styles.postImage;
  return (
    <div className={className}>
      <img src={src} alt="post: img" />
    </div>
  );
}
