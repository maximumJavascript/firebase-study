import React from 'react';
import styles from './createPostBtn.module.css';
class CreatePostBtn extends React.Component {
	render() {
		return (
			<button className={styles.createPostBtn}>
				<span className={styles.btnText}>SEND</span>
			</button>
		);
	}
}

export default CreatePostBtn;
