import React, { Component } from "react";
import { homeService } from "./home.service";
import { observer } from "mobx-react";
import PostItem from "./PostItem";
import "./home.css";

const Home = observer(
	class Home extends Component {
		componentDidMount() {
			void homeService.posts.getPosts();
		}

		render() {
			const postLists = homeService.posts.data;

			return (
				<div className="homePage-wrapper container">
					<div className="homePage">
						{postLists.map((post) => (
							<PostItem key={post.id} post={post} />
						))}
					</div>
				</div>
			);
		}
	}
);

export default Home;
