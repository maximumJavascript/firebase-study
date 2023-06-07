import { Component } from 'react';
import styles from './CommentLoginButton.module.css';
import cn from 'classnames';

export class CommentLoginButton extends Component {
  render() {
    const className = cn(styles.loginBtn, this.props.className);
    return (
      <div className={styles.loginBtnWrapper}>
        <button onClick={this.props.onClick} className={className} type="button">
          {this.props.children}
        </button>
      </div>
    );
  }
}
