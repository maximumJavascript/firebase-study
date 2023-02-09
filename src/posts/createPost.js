import React, { Component } from "react";
import { authService } from "../auth/auth.service";

export class CreatePost extends Component {
	constructor(props) {
		super(props);
		if (!authService.isAuth) window.location.pathname = "/login";
	}

	render() {
		return <div className="createPostPage">hello world</div>;
	}
}
