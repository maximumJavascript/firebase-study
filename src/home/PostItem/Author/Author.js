import styles from './Author.module.css';
import { toJS } from 'mobx';
import { authorService } from './authorService';
export default function Author(props) {
  let users = authorService.getUser(props.post.author.id)
  return (
    <div className={styles.postAuthor}>
      <div className={styles.authorImg}>
        <img
          className={styles.authorImg__img}
          src={users.user.userPhoto}
          alt="img: Photo author post"
        />
      </div>
      <div className={styles.authorInfo}>
        <div className={styles.authorName}>@{users.user.userName}</div>
        <div className={styles.authorPostDate}>{props.date}</div>
      </div>
    </div>
  );
}
