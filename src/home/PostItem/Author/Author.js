import styles from './Author.module.css';
import { userService } from '../../../usersService/UserService';
import { Component } from 'react';
import { DateConverterService } from '../../../dateConverterService/DateConverterService';
import AnswerForm from '../../../comments/AnswerToCommentList/AnswerForm/AnswerForm';
import { toJS } from 'mobx';

class Author extends Component {
  constructor() {
    super();
    this.state = { user: null, openComments: false, showAnswerForm: false };
  }

  componentDidMount() {
    const user = userService.isUserExist(this.props.authorId);
    user.then((author) => this.setState({ user: author }));
  }

  handleShowAnswerOnButton = () => {
    this.props.onClick();
    this.setState((state) => ({
      openComments: !state.openComments,
    }));
  };
  handleAnswerButton = () => {
    this.setState((state) => ({
      showAnswerForm: !state.showAnswerForm,
    }));
  };
  render() {
    const typeOfBtn = this.state.openComments === false ? 'Open' : 'Close';
    if (this.state.user == null) return null;
    const showAnswersBtn =
      this.props.fromComment === true ? (
        <button
          onClick={this.handleShowAnswerOnButton}
          className={styles.showAnswersBtn}
        >
          {' '}
          {typeOfBtn} Answers
        </button>
      ) : null;
    const answerButton =
      this.props.fromComment === true ? (
        <button onClick={this.handleAnswerButton} className={styles.answerBtn}>
          {this.state.showAnswerForm === false ? 'Make Answer' : 'Close'}
        </button>
      ) : null;
    const answerFormStyle =
      this.state.showAnswerForm === true ? 'answerFormStyle' : null;
    const postDate = DateConverterService.convertDate(this.props.date);
    return (
      <div className={`${styles.postAuthor} ${styles[answerFormStyle]}`}>
        <div className={styles.authorImg}>
          <img
            className={styles.authorImg__img}
            src={this.state.user.userPhoto}
            alt='img: Photo author post'
          />
        </div>
        <div className={`${styles.authorInfo} ${styles[answerFormStyle]}`}>
          <div className={styles.authorName}>@{this.state.user.userName}</div>
          <div className={styles.authorPostDate}>{postDate}</div>
          {showAnswersBtn}
          {answerButton}
          {this.state.showAnswerForm === true ? (
            <AnswerForm commentInfo={this.props.commentInfo} />
          ) : null}
        </div>
      </div>
    );
  }
}

export { Author };
