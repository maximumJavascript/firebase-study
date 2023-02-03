import "./Author.css";

export default function Author(props) {
	return (
		<div className="postAuthor">
			<div className="authorImg">
				<img src="https://shop.funlymc.ru/image/Rectangle%2019.png" alt="img: Photo author post" />
			</div>
			<div className="authorInfo">
				<div className="authorName">@{props.name}</div>
				<div className="authorPostDate">{new Date().toLocaleDateString("en", { dateStyle: "medium" })}</div>
			</div>
		</div>
	);
}
