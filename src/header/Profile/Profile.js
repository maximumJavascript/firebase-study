import { observer } from 'mobx-react';
import React from 'react';
import styles from '../Header.module.css';
import { authService } from '../../auth/auth.service';

export const Profile = observer(
  class Profile extends React.Component {
    render() {
      const ImageSrc = authService.photoSrc;
      return (
        <div className={styles.rightLinks}>
          <div className={styles.authPicture}>
            <img className={styles.authImg} src={ImageSrc} />
          </div>
        </div>
      );
    }
  }
);
