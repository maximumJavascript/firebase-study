import { Component } from 'react';
import Author from '../../home/PostItem/Author';
import styles from './Comment.module.css';

const Comment = class Comment extends Component {
  render() {
    // создать сервис для нахождения объекта с инфой о пользователе по его id
    // и передавать в автора
    console.log('renderComments');
    return (
      <div className={styles.comment}>
        <Author authorId={this.props.data.authorId} />
        <div className={styles.commentText}>{this.props.data.text}</div>
      </div>
    );
  }
};

export { Comment };
