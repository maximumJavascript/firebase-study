import { AuthorSkeleton } from '../Author/AuthorSkeleton';
import { RatingSkeleton } from '../Rating/RatingSkeleton';
import { ViewsSkeleton } from '../Views/ViewsSkeleton';
import cn from 'classnames';
import styles from './PostItemSkeleton.module.css';
import postStyles from '../PostItem.module.css';
import SvgNext from '../../../assets/icons/SvgNext';

export function PostItemSkeleton() {
  return (
    <div className={postStyles.post}>
      <div className={postStyles.postContainer}>
        <div className={cn(postStyles.postBodyText, styles.postBodyText)}>
          <div
            className={cn(postStyles.postTitle, styles.title, styles.skeletonLoading)}
          ></div>
          <div
            className={cn(
              postStyles.postTextContainer,
              styles.text,
              styles.skeletonLoading
            )}
          ></div>
        </div>
        <div className={postStyles.postFooter}>
          <AuthorSkeleton />
        </div>
      </div>
    </div>
  );
}
