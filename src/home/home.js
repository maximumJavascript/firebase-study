import React, { Component } from 'react';
import { homeService } from './home.service';
import { observer } from 'mobx-react';
import PostItem from './PostItem';
import styles from './home.module.css';
import { userService } from '../usersService/UserService';
import { toJS } from 'mobx';
const Home = observer(
  class Home extends Component {
    componentDidMount() {
      void homeService.posts.getPosts();
      void userService.getUsers();
    }
    render() {
      const postLists = homeService.posts.data;
      const userList = userService.data;
      return (
        <div className={styles.container}>
          <div className={styles.homePage}>
            {postLists.map((post) => {
              console.log(toJS(post));
              return userList.map((user) => {
                if (user.user.userUid === post.author.id) {
                  return (
                    <PostItem
                      key={post.id}
                      post={post}
                      user={user.user}
                      date={post.date}
                    />
                  );
                }
              });
            })}
          </div>
        </div>
      );
    }
  }
);

export default Home;
