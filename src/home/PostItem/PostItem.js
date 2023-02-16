import SvgNext from '../../assets/icons/SvgNext';
import Author from './Author';
import Views from './Views';
import Raiting from './Raiting';
import styles from './PostItem.module.css';

export default function PostItem(props) {
	return (
		<div className={styles.post}>
			<div className={styles.postImage}>
				<img
					src="https://shop.funlymc.ru/image/unsplash_EhTcC9sYXsw.jpg"
					alt="post: img"
				/>
			</div>
			<div className={styles.postContainer}>
				<div className={styles.postBodyText}>
					<div className={styles.postTitle}>{props.post.title}</div>
					<div className={styles.postTextContainer}>{props.post.text}</div>
				</div>
				<div className={styles.postFooter}>
					<Author name={props.post.author.name} />
					<Views />
					<Raiting />
					<div className={styles.postShowMore}>
						<SvgNext />
					</div>
				</div>
			</div>
		</div>
	);
}
