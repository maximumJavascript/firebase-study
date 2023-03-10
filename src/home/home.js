import React, { Component } from 'react';
import { homeService } from './home.service';
import { observer } from 'mobx-react';
import PostItem from './PostItem';
import styles from './home.module.css';
import { userService } from '../usersService/UserService';
import { viewsCounter } from '../viewsCounter/ViewsCounter';

const Home = observer(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.arr = [];
    }
    componentDidMount() {
      void homeService.posts.getPosts();
      void userService.getUsers();
    }
    setRef = (ref, id) => {
      this.arr.push({ ref });
    };
    render() {
      // костыль. Без него работает не совсем так, как хотелось бы. Нужно обсудить
      setTimeout(() => viewsCounter.arrWithRefs(this.arr), 0);
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
