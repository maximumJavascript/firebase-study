import SvgEye from '../../../assets/icons/SvgEye';
import styles from './Views.module.css';

export const Views = function Views({ viewCounter = 0 }) {
  return (
    <div className={styles.postViews}>
      <div className={styles.postViewsSvg}>
        <SvgEye />
      </div>
      <div className={styles.postViewsCount}>{viewCounter}</div>
    </div>
  );
};
