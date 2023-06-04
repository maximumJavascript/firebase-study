import SvgNext from '../../assets/icons/SvgNext';
import { Author } from './Author';
import { Views } from './Views';
import { Rating } from './Rating/Rating';
import styles from './PostItem.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { CommentLoginButton } from '../../controls/CommentLoginButton/CommentLoginButton';
import { animated, Spring } from '@react-spring/web';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../constants/posts';

export class PostItem extends React.Component {
  ref = React.createRef();

  constructor(props) {
    super(props);
    this.state = { currentUsserUid: null };
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) this.setState({ currentUsserUid: user.uid });
    });
  }

  shortTextWithDots(text, maxLength) {
    if (text.length > maxLength) {
      text.length = maxLength;
      text += '...';
    }
    return text;
  }

  getProcessedText() {
    let { title = '', text = '' } = this.props.post;
    if (!this.props.withComments) {
      title = this.shortTextWithDots(title, MAX_TITLE_LENGTH);
      text = this.shortTextWithDots(text, MAX_DESCRIPTION_LENGTH);
    }
    return { title, text };
  }

  render() {
    const { props } = this;
    const { title, text } = this.getProcessedText();
    const src = props.post.base64Img;
    const postUserUid = props.post.author.id;
    return (
      <Spring>
        {(s) => (
          <animated.div
            className={styles.post}
            data-postid={props.post.id}
            ref={this.ref}
            style={s}
          >
            {src && (
              <div className={styles.postImage}>
                <img src={src} alt="post: img" />
              </div>
            )}
            <div className={styles.postContainer}>
              <div className={styles.postBodyText}>
                <div className={styles.postTitle}>{title}</div>
                <div className={styles.postTextContainer}>{text}</div>
              </div>
              <div className={styles.postFooter}>
                <Author date={props.date} authorId={props.post.author.id} />
                <Views postId={props.post.id} viewCounter={props.viewCounter} />
                <Rating postId={props.post.id} />
                {!props.withComments && (
                  <Link to={`/comments/${props.post.id}`}>
                    <div className={styles.postShowMore}>
                      <SvgNext />
                    </div>
                  </Link>
                )}

                {this.state.currentUsserUid === postUserUid ? (
                  <CommentLoginButton
                    onClick={() => this.props.deletePostItem(props.post.id)}
                    text={'DEL'}
                  />
                ) : null}
              </div>
            </div>
          </animated.div>
        )}
      </Spring>
    );
  }
}
