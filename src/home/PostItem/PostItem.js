import SvgNext from '../../assets/icons/SvgNext';
import { Author } from './Author';
import { Views } from './Views';
import { Rating } from './Rating/Rating';
import styles from './PostItem.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { ButtonUI } from '../../controls/ButtonUI';
import { animated, Spring } from '@react-spring/web';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../constants/posts';
import { PostItemSkeleton } from './PostItemSkeleton';
import { toJS } from 'mobx';

export class PostItem extends React.Component {
  ref = React.createRef();

  constructor(props) {
    super(props);
    this.state = { currentUsserUid: null };
  }

  componentDidMount() {
    this.unsubscribeAuthChange = onAuthStateChanged(auth, (user) => {
      if (user) this.setState({ currentUsserUid: user.uid });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeAuthChange) this.unsubscribeAuthChange();
  }

  shortTextWithDots(text, maxLength) {
    if (text.length > maxLength) {
      text.length = maxLength;
      text += '...';
    }
    return text;
  }

  handleDeletePost = () => {
    this.props.deletePostItem(this.props.post.id);
  };

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
    const { post } = props;

    if (post.isLoading) return <PostItemSkeleton />;

    const { title, text } = this.getProcessedText();
    const src = post.base64Img;
    const postUserUid = post.authorId;
    const showDeletePostBtn =
      this.state.currentUsserUid === postUserUid && props.withComments;
    console.log(toJS(post));
    return (
      <div className={styles.post} data-postid={post.id} ref={this.ref}>
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
            <Author date={post.date.seconds} authorInfo={post.authorInfo} />
            <Views postId={post.id} viewCounter={post.viewedBy.length} />
            <Rating postId={post.id} />
            {!props.withComments && (
              <Link to={`/comments/${post.id}`}>
                <div className={styles.postShowMore}>
                  <SvgNext />
                </div>
              </Link>
            )}
            {showDeletePostBtn && (
              <ButtonUI onClick={this.handleDeletePost}>Delete</ButtonUI>
            )}
          </div>
        </div>
      </div>
    );
  }
}
