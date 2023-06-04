import styles from './Author.module.css';
import { userService } from '../../../usersService/UserService';
import { Component } from 'react';
import { DateConverterService } from '../../../dateConverterService/DateConverterService';

export class Author extends Component {
  state = { user: null };

  async componentDidMount() {
    const { authorInfo, authorId } = this.props;
    const user = authorInfo ?? (await userService.getSingleUser(authorId));
    this.setState({ user });
  }

  render() {
    if (!this.state.user) return null;
    const postDate = DateConverterService.convertDate(this.props.date);
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
          <div className={styles.authorPostDate}>{postDate}</div>
        </div>
      </div>
    );
  }
}
