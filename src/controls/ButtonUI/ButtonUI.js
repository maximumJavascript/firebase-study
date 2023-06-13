import { Component } from 'react';
import styles from './ButtonUI.module.css';
import cn from 'classnames';

export class ButtonUI extends Component {
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
