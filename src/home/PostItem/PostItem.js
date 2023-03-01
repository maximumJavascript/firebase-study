import SvgNext from '../../assets/icons/SvgNext';
import Author from './Author';
import Views from './Views';
import Raiting from './Raiting';
import styles from './PostItem.module.css';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
import { authService } from '../../auth/auth.service';
import { render } from 'react-dom';
import React from 'react';
import { ref } from '../../viewsCounter/ref';
export default class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    // this.ref = React.createRef();
  }

  render() {
    // console.log(toJS(this.props));
    const src = this.props.post.base64Img;
    return (
      <div className={styles.post}>
        {src && (
          <div className={styles.postImage}>
            <img src={src} alt="post: img" />
          </div>
        )}
        <div className={styles.postContainer}>
          <div className={styles.postBodyText}>
            <div className={styles.postTitle}>{this.props.post.title}</div>
            <div className={styles.postTextContainer}>{this.props.post.text}</div>
          </div>
          <div className={styles.postFooter}>
            <Author date={this.props.date} authorId={this.props.post.author.id} />
            <Views postId={this.props.post.id} />
            <Raiting />
            {!this.props.isComments && (
              <Link to={`/comments/${this.props.post.id}`}>
                <div className={styles.postShowMore}>
                  <SvgNext />
                </div>
              </Link>
            )}
          </div>
          <button onClick={() => console.log(this.props.ref.current)}>SHOREF</button>
        </div>
      </div>
    );
  }
}
