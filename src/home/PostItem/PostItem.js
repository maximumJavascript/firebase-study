import { Component } from "react";
import SvgNext from "../../assets/icons/SvgNext";
import SvgEye from "../../assets/icons/SvgEye";
import SvgEmptyStar from "../../assets/icons/SvgEmptyStar";

export default class PostItem extends Component {
	render() {
		return (
			<div className="post">
				<div className="postImage">
					<img src="https://shop.funlymc.ru/image/unsplash_EhTcC9sYXsw.jpg" alt="post: img" />
				</div>
				<div className="postContainer">
					<div className="postBodyText">
						<div className="postTitle">{this.props.post.title}</div>
						<div className="postTextContainer"> {this.props.post.text} </div>
					</div>
					<div className="postFooter">
						<div className="postAuthor">
							<div className="authorImg">
								<img src="https://shop.funlymc.ru/image/Rectangle%2019.png" alt="img: Photo author post" />
							</div>
							<div className="authorInfo">
								<div className="authorName">@{this.props.post.author.name}</div>
								<div className="authorPostDate">{new Date().toLocaleDateString("en", { dateStyle: "medium" })}</div>
							</div>
						</div>
						<div className="postViews">
							<div className="postViewsSvg">
								<SvgEye />
							</div>
							<div className="postViewsCount">0</div>
						</div>
						<div className="postRaiting">
							<SvgEmptyStar />
							<SvgEmptyStar />
							<SvgEmptyStar />
							<SvgEmptyStar />
							<SvgEmptyStar />
						</div>
						<div className="postShowMore">
							<SvgNext />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
