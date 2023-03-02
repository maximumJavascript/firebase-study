import styles from './Author.module.css';
import { userService } from '../../../usersService/UserService';
import { Component } from 'react';

class Author extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }
  componentDidMount() {
    const user = userService.isUserExist(this.props.authorId);
    user.then((author) => this.setState({ user: author }));
  }
  render() {
    if (this.state.user == null) return null;
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
          <div className={styles.authorPostDate}>{this.props.date}</div>
        </div>
      </div>
    );
  }
}

export { Author };
