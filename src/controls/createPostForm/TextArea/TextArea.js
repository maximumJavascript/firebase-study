import { Component } from 'react';
import styles from './textArea.module.css';

export default class TextArea extends Component {
  render() {
    const classNames = Array.isArray(this.props.classNames)
      ? this.props.classNames.join(' ')
      : '';
    return (
      <textarea
        className={`${styles.createPostTextArea} ${classNames}`}
        placeholder={this.props.placeholder}
        name="area"
        onChange={this.props.onChange}
        value={this.props.value}
        required
      ></textarea>
    );
  }
}
