import { AuthorSkeleton } from '../AuthorSkeleton';
import styles from './CommentSkeleton.module.css';
import { SkeletonLoadingStyles } from '../SkeletonLoadingStyles';
import cn from 'classnames';

export function CommentSkeleton() {
  return (
    <div>
      <AuthorSkeleton />
      <div
        className={cn(styles.commentTextSkeleton, SkeletonLoadingStyles.skeletonLoading)}
      ></div>
    </div>
  );
}
