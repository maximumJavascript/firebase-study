import SvgEye from '../../../assets/icons/SvgEye';
import styles from './Views.module.css';

export default function Views() {
  return (
    <div className={styles.postViews}>
      <div className={styles.postViewsSvg}>
        <SvgEye />
      </div>
      <div className={styles.postViewsCount}>0</div>
    </div>
  );
}
