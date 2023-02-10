import React from "react";
import TitleInput from "../TitleInput/TitleInput";
import TextArea from "../TextArea/TextArea";
import styles from "./createPostComponent.module.css";
class CreatePostComponent extends React.Component {
  render() {
    return (
      <div className={styles.createPostContainer}>
        <TitleInput />
        <TextArea />
      </div>
    );
  }
}

export default CreatePostComponent;
