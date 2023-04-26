import { Component } from 'react';
import Author from '../../home/PostItem/Author';
import styles from './Comment.module.css';
import { toJS } from 'mobx';
import { AnswerToCommentList } from '../AnswerToCommentList/AnswerToCommentList';
const Comment = class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { showComment: false };
  }
  handleClick = () => {
    // this.props.data - информация о комментарии, на который мы хотим ответить
    // this.props.data.authorId
    this.setState((state, props) => ({
      showComment: !state.showComment,
    }));
  };

  render() {
    // console.log(toJS(this.props.data));
    return (
      <>
        <div className={styles.comment}>
          <Author
            authorId={this.props.data.authorId}
            date={this.props.data.date.seconds}
            onClick={this.handleClick}
            fromComment={true}
            commentInfo={this.props.data}
          />
          <div className={styles.commentText}>{this.props.data.text}</div>
        </div>

        {this.state.showComment && (
          <AnswerToCommentList commentInfo={this.props.data} />
        )}
      </>
    );
  }
};

export { Comment };
