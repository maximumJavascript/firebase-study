import React, { Component } from "react";
import { authService } from "../auth/auth.service";
import { createPostService } from "./createPost.service";

export class CreatePost extends Component {
	constructor(props) {
		super(props);
		if (!authService.isAuth) window.location.pathname = "/login";
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		const target = e.target;
		createPostService
			.handleCreatePost({
				title: target.title.value,
				text: target.text.value,
			})
			.then(console.log);
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
