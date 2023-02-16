import { observer } from 'mobx-react';
import React from 'react';
import styles from '../Navbar.module.css';
import { authService } from '../../auth/auth.service';
import { storageService } from '../../localStorageService/storageService';
const RightNavbar = observer(
	class RightNavbar extends React.Component {
		render() {
			let ImageSrc = authService.photoSrc;
			return (
				<ul className={styles.rightLinks}>
					<li className={styles.newsLeftLink}>
						<div className={styles.newsContainer}>
							<a href="#" className={styles.newsLeft}>
								News
							</a>
							<div className={styles.dash}></div>
						</div>
					</li>
					<li className={styles.blogLink}>
						<a className={styles.blog} href="#">
							Blog
						</a>
					</li>
					<li className={styles.authPicture}>
						<img className={styles.authImg} src={ImageSrc} />
					</li>
				</ul>
			);
		}
	}
);

export default RightNavbar;
