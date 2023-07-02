import styles from './Author.module.css';
import { Component } from 'react';
import { DateConverterService } from '../../../dateConverterService/DateConverterService';

export class Author extends Component {
  render() {
    const { authorInfo, dateSec, isComment } = this.props;
    const date = dateSec * 1000;
    if (!authorInfo) return null;

    const postDate = isComment
      ? DateConverterService.getRelativeTimeAgo(date)
      : DateConverterService.formatDateTime(date);
    return (
      <div className={styles.postAuthor}>
        <div className={styles.authorImg}>
          <img
            className={styles.authorImg__img}
            src={authorInfo.userPhoto}
            alt="img: Photo author post"
          />
        </div>
        <div className={styles.authorInfo}>
          <div className={styles.authorName}>@{authorInfo.userName}</div>
          <div className={styles.authorPostDate}>{postDate}</div>
        </div>
      </div>
    );
  }
}
