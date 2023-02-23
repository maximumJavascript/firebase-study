import SvgNext from '../../assets/icons/SvgNext';
import Author from './Author';
import Views from './Views';
import Rating from './Rating';
import styles from './PostItem.module.css';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';

export default function PostItem(props) {
  return (
    <div className={styles.post}>
      <div className={styles.postImage}>
        <img
          src="https://shop.funlymc.ru/image/unsplash_EhTcC9sYXsw.jpg"
          alt="post: img"
        />
      </div>
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
          <Rating postId={props.post.id} />
          {!props.isComments && (
            <Link to={`/comments/${props.post.id}`}>
              <div className={styles.postShowMore}>
                <SvgNext />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
