import SvgNext from '../../assets/icons/SvgNext';
import Author from './Author';
import Views from './Views';
import { Rating } from './Rating/Rating';
import styles from './PostItem.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { toJS } from 'mobx';
class PostItem extends React.Component {
  ref = React.createRef();
  render() {
    const { props } = this;
    const src = props.post.base64Img;
    return (
      <div className={styles.post} data-postid={props.post.id} ref={this.ref}>
        {src && (
          <div className={styles.postImage}>
            <img src={src} alt='post: img' />
          </div>
        )}
        <div className={styles.postContainer}>
          <div className={styles.postBodyText}>
            <div className={styles.postTitle}>{props.post.title}</div>
            <div className={styles.postTextContainer}>{props.post.text}</div>
          </div>
          <div className={styles.postFooter}>
            <Author date={props.date} authorId={props.post.author?.id} />
            <Views postId={props.post.id} viewCounter={props.viewCounter} />
            <Rating postId={props.post.id} />
            {!props.isComments && (
              <Link to={`/comments/${props.post.id}`}>
                <div className={styles.postShowMore}>
                  <SvgNext />
                </div>
              </Link>
            )}
            <button onClick={() => this.props.deletePostItem(props.post.id)}>
              DEL
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PostItem;
