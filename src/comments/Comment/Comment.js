import { Component } from 'react';
import Author from '../../home/PostItem/Author';
import styles from './Comment.module.css';
import { toJS } from 'mobx';
const Comment = class Comment extends Component {
  render() {
    return (
      <div className={styles.comment}>
        <Author
          authorId={this.props.data.authorId}
          date={this.props.data.data.seconds}
        />
        <div className={styles.commentText}>{this.props.data.text}</div>
      </div>
    );
  }
};

export { Comment };
