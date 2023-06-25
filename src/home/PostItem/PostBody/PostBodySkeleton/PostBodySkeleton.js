import styles from './PostBodySkeleton.module.css';
import stylesPostBody from '../PostBody.module.css';
import cn from 'classnames';

export function PostBodySkeleton() {
  return (
    <div className={cn(stylesPostBody.postBodyText, styles.postBodyText)}>
      <div className={cn(styles.title, styles.skeletonLoading)}></div>
      <div className={cn(styles.text, styles.skeletonLoading)}></div>
    </div>
  );
}
