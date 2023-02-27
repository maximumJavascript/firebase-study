import { observer } from 'mobx-react-lite';
import SvgEye from '../../../assets/icons/SvgEye';
import styles from './Views.module.css';
import { viewsCounter } from '../../../viewsCounter/ViewsCounter';
export default observer(function Views() {
  // console.log('внутри views');
  let counter = viewsCounter.viewsCounter;
  return (
    <div className={styles.postViews}>
      <div className={styles.postViewsSvg}>
        <SvgEye />
      </div>
      <div className={styles.postViewsCount}>{counter}</div>
    </div>
  );
});
