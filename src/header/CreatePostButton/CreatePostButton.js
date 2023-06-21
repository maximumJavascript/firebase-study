import React from 'react';
import styles from '../Header.module.css';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

export const CreatePostButton = observer(
  class CreatePostButton extends React.Component {
    render() {
      return (
        <div className={styles.centerLinks}>
          <Link to="/createpost">
            <span className={(styles.navText, styles.createPostText)}>Create Post</span>
          </Link>
        </div>
      );
    }
  }
);
