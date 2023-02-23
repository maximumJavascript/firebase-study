import styles from './Author.module.css';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { authorService } from './authorService';
import { userService } from '../../../usersService/UserService';
import { Component } from 'react';
const Author = observer(
  class Author extends Component {
    componentDidMount() {
      void authorService.getAuthor(this.props.authorId);
    }
    render() {
      const users = authorService.getAuthors;
      console.log(toJS(users));
      return null;
      // return (
      // <div className={styles.postAuthor}>
      {
        /* <div className={styles.authorImg}> */
      }
      {
        /* <img */
      }
      // className={styles.authorImg__img}
      // src={user.userPhoto}
      // alt="img: Photo author post"
      // />
      {
        /* </div> */
      }
      {
        /* <div className={styles.authorInfo}> */
      }
      {
        /* <div className={styles.authorName}>@{user.userName}</div> */
      }
      {
        /* <div className={styles.authorPostDate}>{this.props.date}</div> */
      }
      {
        /* </div> */
      }
      {
        /* </div> */
      }
      // );
    }
  }
);

export { Author };
