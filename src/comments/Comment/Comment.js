import { Component } from 'react';
import Author from '../../home/PostItem/Author';
import styles from './Comment.module.css';
import { toJS } from 'mobx';
import { DateConverterService } from '../../dateConverterService/DateConverterService';
const Comment = class Comment extends Component {
  render() {
    // создать сервис для нахождения объекта с инфой о пользователе по его id
    // и передавать в автора
    const dateOfComment = DateConverterService.convertDate(this.props.data.date.seconds);
    return (
      <div className={styles.comment}>
        <Author authorId={this.props.data.authorId} date={dateOfComment} />
        <div className={styles.commentText}>{this.props.data.text}</div>
      </div>
    );
  }
};

export { Comment };
