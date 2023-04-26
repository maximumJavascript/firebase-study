import { Component } from 'react';
import styles from './SingleAnswer.module.css';
import { toJS } from 'mobx';
import { userService } from '../../../usersService/UserService';
import { answerService } from '../AnswerForm/AnswerService';
import { DateConverterService } from '../../../dateConverterService/DateConverterService';
import { auth } from '../../../firebase-config';
class SingleAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      userPhoto: null,
      commentText: 'commentText',
    };
  }

  componentDidMount() {
    const authorId = this.props.answerInfo.answerAuthorId;
    userService.isUserExist(authorId).then((author) => {
      this.setState({
        userName: author.userName,
        userPhoto: author.userPhoto,
      });
    });
  }

  render() {
    const src = this.state.userPhoto;
    const date = DateConverterService.shortConvertDate(
      this.props.answerInfo.date.seconds
    );
    return (
      <div className={styles.answerContainer}>
        <div className={styles.answerHeader}>
          <img className={styles.singleAnswerImg} src={src}></img>
          <span className={styles.answerNick}>{this.state.userName}</span>
          <span className={styles.answerDate}>{date}</span>
        </div>

        <p className={styles.answeText}>{this.props.answerInfo.answerText}</p>
      </div>
    );
  }
}
export default SingleAnswer;
