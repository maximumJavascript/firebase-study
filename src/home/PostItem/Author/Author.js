import styles from './Author.module.css';
import { observer } from 'mobx-react';
import { authorService } from './authorService';
import { userService } from '../../../usersService/UserService';
import { Component } from 'react';

const Author = observer(
  class Author extends Component {
    componentDidMount() {
      void userService.getUsers();
    }
    render() {
      const userList = userService.data;
      if (!userList.length) return null;
      let author = authorService.findTheAuthor(userList, this.props.authorId);
      return (
        <div className={styles.postAuthor}>
          <div className={styles.authorImg}>
            <img
              className={styles.authorImg__img}
              src={author.user.userPhoto}
              alt="img: Photo author post"
            />
          </div>

          <div className={styles.authorInfo}>
            <div className={styles.authorName}>@{author.user.userName}</div>

            <div className={styles.authorPostDate}>{this.props.date}</div>
          </div>
        </div>
      );
    }
  }
);

export { Author };
