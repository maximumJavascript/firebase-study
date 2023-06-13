import { observer } from 'mobx-react';
import React, { createRef } from 'react';
import styles from '../Header.module.css';
import { authService } from '../../auth/auth.service';
import { ProfileDropDown } from './ProfileDropDown';
import { ProfileLoginButton } from './ProfileLoginButton';

export const Profile = observer(
  class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        openDropDown: false,
      };
    }

    wrapRef = createRef();

    handleClickProfile = (e) => {
      this.setState(({ openDropDown }) => ({ openDropDown: !openDropDown }));
    };

    handleCloseDropDown = () => {
      this.setState({ openDropDown: false });
    };

    render() {
      if (!authService.isAuth) return <ProfileLoginButton />;

      const ImageSrc = authService.photoSrc;
      return (
        <div className={styles.rightLinks} ref={this.wrapRef}>
          <div className={styles.authPicture} onClick={this.handleClickProfile}>
            <img className={styles.authImg} src={ImageSrc} />
          </div>
          {this.state.openDropDown && (
            <ProfileDropDown onClose={this.handleCloseDropDown} wrapRef={this.wrapRef} />
          )}
        </div>
      );
    }
  }
);
