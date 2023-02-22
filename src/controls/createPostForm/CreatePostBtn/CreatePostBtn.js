import React from 'react';
import styles from './createPostBtn.module.css';
class CreatePostBtn extends React.Component {
  render() {
    const className = this.props.className ? this.props.className : '';
    return (
      <button className={`${styles.createPostBtn} ${className}`}>
        <span className={styles.btnText}>{this.props.text}</span>
      </button>
    );
  }
}

export default CreatePostBtn;
