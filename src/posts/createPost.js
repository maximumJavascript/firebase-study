import React, { Component } from "react";
import { authService } from "../auth/auth.service";
import { createPostService } from "./createPost.service";

export class CreatePost extends Component {
	constructor(props) {
		super(props);
		if (!authService.isAuth) window.location.pathname = "/login";
	}

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
