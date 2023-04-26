import { Component } from 'react';
import styles from './AnswerForm.module.css';
import { answerService } from './AnswerService';
import { auth } from '../../../firebase-config';
import { Timestamp } from 'firebase/firestore';
import { toJS } from 'mobx';
class AnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  // toJS(this.props.commentInfo) - инфа о том комментарии, под которым мы пишем ответ
  handleSendAnswer = (e) => {
    e.preventDefault();
    // console.log(this.state.value);
    // console.log('auth.currentUser.uid', auth.currentUser.uid);
    answerService.createAnswer({
      answerAuthorId: auth.currentUser.uid,
      answerText: this.state.value,
      date: Timestamp.fromDate(new Date()),
      commentId: this.props.commentInfo.id,
    });
    // e.reset();
  };
  render() {
    return (
      <form className={styles.answerForm} onSubmit={this.handleSendAnswer}>
        <input
          type='text'
          placeholder='Введите ваш комментарий'
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          className={styles.inputAnswer}
        />
        <button>Отправить</button>
      </form>
    );
  }
}
export default AnswerForm;
