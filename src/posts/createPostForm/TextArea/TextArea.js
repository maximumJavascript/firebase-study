import { Component } from "react";
import styles from "./textArea.module.css";

export default class TextArea extends Component {
  render() {
    return (
      <textarea
        className={styles.createPostTextArea}
        placeholder="Text post"
        name="area"
        onChange={this.props.onChange}
        value={this.props.value}
        required
      ></textarea>
    );
  }
}
