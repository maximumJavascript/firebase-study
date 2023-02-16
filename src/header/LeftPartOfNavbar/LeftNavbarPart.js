import React from 'react';
import styles from '../Navbar.module.css';

class LeftNavbar extends React.Component {
	render() {
		return (
			<ul className={styles.leftLinks}>
				<li className={styles.newsLink}>
					<a href="#" className={styles.news}>
						News
					</a>
				</li>
				<li>
					<a href="#" className={styles.portal}>
						Portal
					</a>
				</li>
			</ul>
		);
	}
}
export default LeftNavbar;
