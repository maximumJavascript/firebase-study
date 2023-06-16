import { Component } from 'react';
import { homeService } from './home.service';
import { observer } from 'mobx-react';
import { PostItem } from './PostItem';
import styles from './home.module.css';
import { viewsCounter } from '../viewsCounter/ViewsCounter';
import { postsService } from '../posts/posts.service';
import { ErrorBoundary } from '../errorBoundary';
import { ModalComments } from '../comments/ModalComments';
import { toJS } from 'mobx';

export const Home = observer(
  class Home extends Component {
    arrWithRefs = [];

    componentDidMount() {
      void homeService.posts.getPosts(true);
      viewsCounter.makePostsObservable(this.arrWithRefs);
    }

    componentDidUpdate() {
      viewsCounter.makePostsObservable(this.arrWithRefs);
    }

    setRef = (ref) => {
      this.arrWithRefs.push(ref);
    };

    render() {
      this.arrWithRefs = [];
      const postLists = homeService.posts.data;
      if (!postLists.length) return null;
      const { withComments } = this.props;
      return (
        <div className={`${styles.container} ${styles.home}`}>
          <div className={styles.homePage}>
            {postLists.map((post) => {
              return (
                <ErrorBoundary key={post.id} slotError={true}>
                  <PostItem
                    post={post}
                    ref={post.isLoading ? null : this.setRef}
                    deletePostItem={postsService.deletePostItem}
                  />
                </ErrorBoundary>
              );
            })}
          </div>
          {withComments && <ModalComments />}
        </div>
      );
    }
  }
);
