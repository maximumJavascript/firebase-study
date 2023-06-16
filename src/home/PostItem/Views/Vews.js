import SvgEye from '../../../assets/icons/SvgEye';
import styles from './Views.module.css';

export const Views = function Views(props) {
  return (
    <div className={styles.postViews}>
      <div className={styles.postViewsSvg}>
        <SvgEye />
      </div>
      <div className={styles.postViewsCount}>{props.viewCounter}</div>
    </div>
  );
};
