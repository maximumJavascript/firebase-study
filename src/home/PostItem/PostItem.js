import SvgNext from "../../assets/icons/SvgNext";
import Author from "./Author";
import Views from "./Views";
import Raiting from "./Raiting";
import "./PostItem.css";

export default function PostItem(props) {
	return (
		<div className="post">
			<div className="postImage">
				<img src="https://shop.funlymc.ru/image/unsplash_EhTcC9sYXsw.jpg" alt="post: img" />
			</div>
			<div className="postContainer">
				<div className="postBodyText">
					<div className="postTitle">{props.post.title}</div>
					<div className="postTextContainer">{props.post.text}</div>
				</div>
				<div className="postFooter">
					<Author name={props.post.author.name} />
					<Views />
					<Raiting />
					<div className="postShowMore">
						<SvgNext />
					</div>
				</div>
			</div>
		</div>
	);
}
