import SvgNext from '../../assets/icons/SvgNext';
import Author from './Author';
import Views from './Views';
import Raiting from './Raiting';
import styles from './PostItem.module.css';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
import { authService } from '../../auth/auth.service';
import { render } from 'react-dom';
import { viewsCounter } from '../../viewsCounter/ViewsCounter';
import React from 'react';
const PostItem = React.forwardRef((props, ref) => {
  const src = props.post.base64Img;
  return (
    <div className={styles.post} ref={ref} postid={props.post.id}>
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
          <Author date={props.date} authorId={props.post.author.id} />
          <Views postId={props.post.id} viewCounter={props.viewCounter} />
          <Raiting />
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
});
export default PostItem;
