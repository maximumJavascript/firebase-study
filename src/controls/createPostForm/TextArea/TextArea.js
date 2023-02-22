import { Component } from 'react';
import styles from './textArea.module.css';

export default class TextArea extends Component {
  render() {
    const className = this.props.className ? this.props.className : '';
    return (
      <textarea
        className={`${styles.createPostTextArea} ${className}`}
        placeholder={this.props.placeholder}
        name={this.props.name}
        onChange={this.props.onChange}
        value={this.props.value}
        required
      ></textarea>
    );
  }
}
