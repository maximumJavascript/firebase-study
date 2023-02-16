import React, { Component } from 'react';
import { homeService } from './home.service';
import { observer } from 'mobx-react';
import PostItem from './PostItem';
import styles from './home.module.css';

const Home = observer(
	class Home extends Component {
		componentDidMount() {
			void homeService.posts.getPosts();
		}

		render() {
			const postLists = homeService.posts.data;

			return (
				<div className={styles.container}>
					<div className={styles.homePage}>
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
