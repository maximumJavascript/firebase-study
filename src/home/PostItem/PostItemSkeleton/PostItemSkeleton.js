import { AuthorSkeleton } from '../Author/AuthorSkeleton';
import postStyles from '../PostItem.module.css';
import { PostBodySkeleton } from '../PostBody/PostBodySkeleton';

export function PostItemSkeleton() {
  return (
    <div className={postStyles.post}>
      <div className={postStyles.postContainer}>
        <PostBodySkeleton />
        <div className={postStyles.postFooter}>
          <AuthorSkeleton />
        </div>
      </div>
    </div>
  );
}
