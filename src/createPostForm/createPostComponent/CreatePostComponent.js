import React from "react";
import TitleInput from "../TitleInput/TitleInput";
import TextArea from "../TextArea/TextArea";
import styles from "./createPostComponent.module.css";
import CreatePostBtn from "../CreatePostBtn/CreatePostBtn";
class CreatePostComponent extends React.Component {
  render() {
    return (
      <div className={styles.createPostContainer}>
        <h2 className={styles.postTitle}>FORM</h2>
        <TitleInput />
        <TextArea />
        <CreatePostBtn />
      </div>
    );
  }
}

export default CreatePostComponent;
