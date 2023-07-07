import SvgNext from '../../assets/icons/SvgNext';
import { Author } from './Author';
import { Views } from './Views';
import { Rating } from './Rating/Rating';
import styles from './PostItem.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { ButtonUI } from '../../controls/ButtonUI';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../constants/posts';
import { PostItemSkeleton } from './PostItemSkeleton';
import { postsService } from '../../posts/posts.service';
import { withConditionalLink } from '../../hoc/withConditionalLink';
import { PostBody } from './PostBody';
import { toJS } from 'mobx';
import { PostImage } from './PostImage';
import { PostDeleteButton } from './PostDeleteButton';

const AuthorWithConditionalLink = withConditionalLink(Author);
const PostBodyWithConditionalLink = withConditionalLink(PostBody);
const PostImageWithConditionalLink = withConditionalLink(PostImage);

export class PostItem extends React.Component {
  ref = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      currentUsserUid: null,
    };
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
      text = text.slice(0, maxLength);
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
    const { post } = props;

    if (post.isLoading) return <PostItemSkeleton />;

    const { windowSize, withComments, onModalClose } = props;
    const { title, text } = this.getProcessedText();
    const src = post.base64Img;
    const postUserUid = post.authorId;
    const linkToComments = !withComments && `/comments/${post.id}`;
    const showDeletePostBtn = this.state.currentUsserUid === postUserUid && withComments;

    const isMobile = windowSize?.width < 495;
    const Author = (
      <AuthorWithConditionalLink
        to={linkToComments}
        dateSec={post.date.seconds}
        authorInfo={post.authorInfo}
      />
    );

    return (
      <div className={styles.post} data-postid={post.id} ref={this.ref}>
        {src && (
          <PostImageWithConditionalLink
            to={linkToComments}
            src={src}
            linkClassName={styles.postImageLink}
            withComments={withComments}
          />
        )}
        <div className={styles.postContainer}>
          {isMobile && Author}
          <PostBodyWithConditionalLink to={linkToComments} title={title} text={text} />
          <div className={styles.postFooter}>
            {!isMobile && Author}
            <Views viewCounter={post.viewedBy?.length} />
            <Rating postId={post.id} initScore={post.ratingScore} />
            {!withComments && (
              <Link to={linkToComments}>
                <div className={styles.postShowMore}>
                  <SvgNext />
                </div>
              </Link>
            )}
            {showDeletePostBtn && (
              <PostDeleteButton onModalClose={onModalClose} postId={this.props.post.id} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
