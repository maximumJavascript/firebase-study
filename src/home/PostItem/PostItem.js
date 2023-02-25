import SvgNext from '../../assets/icons/SvgNext';
import Author from './Author';
import Views from './Views';
import Raiting from './Raiting';
import styles from './PostItem.module.css';
import { toJS } from 'mobx';

export default function PostItem(props) {
  let src = props.post.base64Img;
  return (
    <div className={styles.post}>
      {src && (
        <div className={styles.postImage}>
          <img src={src} alt="post: img" />
        </div>
      )}
      <div className={styles.postContainer}>
        <div className={styles.postBodyText}>
          <div className={styles.postTitle}>{props.post.title}</div>
          <div className={styles.postTextContainer}>{props.post.text}</div>
        </div>
        <div className={styles.postFooter}>
          <Author
            userPhoto={props.user.userPhoto}
            userName={props.user.userName}
            date={props.date}
          />
          <Views />
          <Raiting />
          <div className={styles.postShowMore}>
            <SvgNext />
          </div>
        </div>
      </div>
    </div>
  );
}
