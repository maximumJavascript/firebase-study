import { Component } from 'react';
import { homeService } from './home.service';
import { observer } from 'mobx-react';
import PostItem from './PostItem';
import styles from './home.module.css';
import { userService } from '../usersService/UserService';
import { viewsCounter } from '../viewsCounter/ViewsCounter';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

const Home = observer(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.arrWithRefs = [];
    }
    componentDidMount() {
      void homeService.posts.getPosts();
      void userService.getUsers();

      viewsCounter.makePostsObservable(this.arrWithRefs);
    }

    componentDidUpdate() {
      viewsCounter.makePostsObservable(this.arrWithRefs);
    }

    setRef = (ref) => {
      this.arrWithRefs.push(ref);
    };
    deletePostItem = async (postId) => {
      await deleteDoc(doc(db, 'posts', postId));
    };
    render() {
      this.arrWithRefs = [];
      const postLists = homeService.posts.data;
      const userList = userService.data;
      return (
        <div className={`${styles.container} ${styles.home}`}>
          <div className={styles.homePage}>
            {postLists.map((post) => {
              let user = userList.find((user) => {
                return user.userUid === post.author.id ? user : undefined;
              });
              return user !== undefined ? (
                <PostItem
                  key={post.id}
                  post={post}
                  user={user.user}
                  date={post.date}
                  ref={this.setRef}
                  viewCounter={post.viewedBy?.length}
                  deletePostItem={this.deletePostItem}
                />
              ) : undefined;
            })}
          </div>
        </div>
      );
    }
  }
);

export default Home;
