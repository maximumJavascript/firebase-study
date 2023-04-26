import { Component } from 'react';
import styles from './AnswerToCommentList.module.css';
import { toJS } from 'mobx';
import SingleAnswer from './SingleAnswer/SingleAnswer';
import { answerService } from './AnswerForm/AnswerService';
import { observer } from 'mobx-react';

// по идее этот компоненте короче будет рендерить список ответов на комментарии из базы
const AnswerToCommentList = observer(
  class AnswerToCommentList extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      void answerService.getAnswers(this.props.commentInfo.id);
    }

    render() {
      const answers = answerService.answers;
      return (
        <div className={styles.answersField}>
          <ul>
            {answers.map((answer) => {
              if (this.props.commentInfo.id !== answer.commentId) return null;
              return (
                <li key={answer.commentId + answer.answerText}>
                  {
                    <SingleAnswer
                      commentInfo={this.props.commentInfo}
                      answerInfo={answer}
                    />
                  }
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
);

export { AnswerToCommentList };
