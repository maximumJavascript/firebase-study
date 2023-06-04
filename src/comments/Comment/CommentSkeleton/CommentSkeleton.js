import { AuthorSkeleton } from '../../../home/PostItem/Author/AuthorSkeleton';
import styles from './CommentSkeleton.module.css';
import commentStyles from '../Comment.module.css';
import cn from 'classnames';

export function CommentSkeleton() {
  return (
    <div className={commentStyles.commentWrap}>
      <AuthorSkeleton />
      <div className={cn(styles.commentText, styles.skeletonLoading)}></div>
    </div>
  );
}
