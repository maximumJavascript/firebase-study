import styles from './AuthorSkeleton.module.css';
import authorStyles from '../Author.module.css';
import cn from 'classnames';

export function AuthorSkeleton() {
  return (
    <div className={authorStyles.postAuthor}>
      <div
        className={cn(
          authorStyles.authorImg__img,
          styles.authorImg,
          styles.skeletonLoading
        )}
      ></div>
      <div className={styles.authorInfo}>
        <div className={cn(styles.authorName, styles.skeletonLoading)}></div>
        <div className={cn(styles.authorPostDate, styles.skeletonLoading)}></div>
      </div>
    </div>
  );
}
