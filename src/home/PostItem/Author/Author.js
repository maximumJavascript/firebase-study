import styles from './Author.module.css';
import { userService } from '../../../usersService/UserService';
import { Component } from 'react';
import { viewsCounter } from '../../../viewsCounter/ViewsCounter';
class Author extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }
  componentDidMount() {
    let user = userService.isUserExist(this.props.authorId);
    user.then((author) => this.setState({ user: author }));
  }
  render() {
    if (this.state.user == null) {
      return null;
    } else {
      return (
        <div className={styles.postAuthor}>
          <div className={styles.authorImg}>
            <img
              className={styles.authorImg__img}
              src={this.state.user.userPhoto}
              alt="img: Photo author post"
            />
          </div>
          <div className={styles.authorInfo}>
            <div className={styles.authorName}>@{this.state.user.userName}</div>
            <button onClick={viewsCounter.increment}>Counter</button>
            <div className={styles.authorPostDate}>{this.props.date}</div>
          </div>
        </div>
      );
    }
  }
}
export { Author };
