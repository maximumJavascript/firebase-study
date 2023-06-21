import styles from './ViewsSkeleton.module.css';
import viewsStyles from '../Views.module.css';
import SvgEye from '../../../../assets/icons/SvgEye';
import cn from 'classnames';

export function ViewsSkeleton() {
  return (
    <div className={viewsStyles.postViews}>
      <div className={cn(viewsStyles.postViewsSvg, styles.eyeSvg)}>
        <SvgEye />
      </div>
      <div className={cn(styles.counter, styles.skeletonLoading)}></div>
    </div>
  );
}
