import { observer } from 'mobx-react-lite';
import SvgEye from '../../../assets/icons/SvgEye';
import styles from './Views.module.css';
import { viewsCounter } from '../../../viewsCounter/ViewsCounter';
import { db } from '../../../firebase-config';
import { updateDoc, doc } from 'firebase/firestore';
import { async } from '@firebase/util';
export default observer(function Views(props) {
  return (
    <div className={styles.postViews}>
      <div className={styles.postViewsSvg}>
        <SvgEye />
      </div>
      <div className={styles.postViewsCount}>{props.viewCounter}</div>
    </div>
  );
});
