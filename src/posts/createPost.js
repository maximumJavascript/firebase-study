import React, { Component } from "react";
import { observer } from "mobx-react";
import { authService } from "../auth/auth.service";
import { createPostService } from "./createPost.service";
import { Navigate } from "react-router-dom";

export const CreatePost = observer(
  class CreatePost extends Component {
    handleFormSubmit = async (e) => {
      e.preventDefault();
      await createPostService.handleCreatePost({
        title: e.target.title.value,
        text: e.target.text.value,
      });
      e.target.title.value = "";
      e.target.text.value = "";
    };

    render() {
      if (!authService.isAuth) return <Navigate to="/login" />;
      return (
        <div className="createPostPage">
          <form onSubmit={this.handleFormSubmit}>
            <input name="title" type="text" id="postTitle" placeholder="Заголовок" />
            <br />
            <textarea name="text" id="postText" cols="30" rows="10"></textarea>
            <br />
            <button type="submit">Отправить</button>
          </form>
        </div>
      );
    }
  }
);
