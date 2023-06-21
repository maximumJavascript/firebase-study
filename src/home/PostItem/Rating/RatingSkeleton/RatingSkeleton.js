import { PureSvgStar } from '../../../../assets/icons/PureSvgStar';
import ratingStyles from '../Rating.module.css';
import starStyles from '../Star/Star.module.css';
import styles from './RatingSkeleton.module.css';

export function RatingSkeleton() {
  return (
    <div className={ratingStyles.postRating}>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <PureSvgStar
            key={i}
            svgClassName={starStyles.star}
            pathClassName={styles.skeletonLoading}
          />
        ))}
    </div>
  );
}
