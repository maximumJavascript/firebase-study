import SvgNext from '../../assets/icons/SvgNext';
import Author from './Author';
import Views from './Views';
import Raiting from './Raiting';
import styles from './PostItem.module.css';
import { Link } from 'react-router-dom';
import React from 'react';

class PostItem extends React.Component {
  ref = React.createRef();
  render() {
    const { props } = this;
    const src = props.post.base64Img;

    return (
      <div className={styles.post} postid={props.post.id} ref={this.ref}>
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
  }
}

export default PostItem;
