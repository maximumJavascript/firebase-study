import React from "react";
import styles from "./textArea.module.css";
export default class TextArea extends React.Component {
  render() {
    return (
      <textarea
        className={styles.createPostTextArea}
        placeholder="Текст статьи"
      ></textarea>
    );
  }
}
