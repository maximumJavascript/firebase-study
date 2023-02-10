import React, { Component } from "react";
import CreatePostComponent from "../createPostForm/CreatePostComponent/CreatePostComponent.js";
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
