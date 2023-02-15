import React, { Component } from "react";
import { observer } from "mobx-react";
import { authService } from "../auth/auth.service";
import { createPostService } from "./createPost.service";
import { Navigate } from "react-router-dom";

export const CreatePost = observer(
  class CreatePost extends Component {
    constructor(props) {
      super(props);
      this.state = {
        titleValue: "",
        areaValue: "",
      };
    }

    handleFormSubmit = async (e) => {
      e.preventDefault();
      this.setState((state) => {
        createPostService.handleCreatePost({
          title: state.titleValue,
          text: state.areaValue,
          photoSrc: authService.photoSrc,
        });
        return { titleValue: "", areaValue: "" };
      });
    };

    handleInput = (e) => {
      this.setState({
        [e.target.name + "Value"]: e.target.value,
      });
    };

    render() {
      console.log(authService.userId);
      if (!authService.isAuth) return <Navigate to="/login" />;
      return (
        <div className="createPostPage">
          <form onSubmit={this.handleFormSubmit}>
            <input
              onChange={this.handleInput}
              value={this.state.titleValue}
              name="title"
              type="text"
              id="postTitle"
              placeholder="Заголовок"
            />
            <br />
            <textarea
              onChange={this.handleInput}
              value={this.state.areaValue}
              name="area"
              id="postText"
              cols="30"
              rows="10"
            ></textarea>
            <br />
            <button type="submit">Отправить</button>
          </form>
        </div>
      );
    }
  }
);
