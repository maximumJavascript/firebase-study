import { Component } from 'react';
import styles from './CommentLoginButton.module.css';

export class CommentLoginButton extends Component {
  render() {
    return (
      <div className={styles.loginBtnWrapper}>
        <button onClick={this.props.onClick} className={styles.loginBtn} type="button">
          {this.props.text}
        </button>
      </div>
    );
  }
}
