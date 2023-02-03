import SvgEye from "../../../assets/icons/SvgEye";
import "./Views.css";

export default function Views() {
	return (
		<div className="postViews">
			<div className="postViewsSvg">
				<SvgEye />
			</div>
			<div className="postViewsCount">0</div>
		</div>
	);
}
