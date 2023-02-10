import React, { Component } from "react";
import CreatePostComponent from "../createPostForm/createPostComponent/CreatePostComponent";
import styles from "./createPost.module.css";
export class CreatePost extends Component {
  render() {
    return (
      <div className={styles.createPostWindow}>
        <CreatePostComponent />
      </div>
    );
  }
}
