import { observer } from 'mobx-react';
import React, { createRef } from 'react';
import styles from '../Header.module.css';
import { authService } from '../../auth/auth.service';
import { ProfileDropDown } from './ProfileDropDown';
import { ProfileLoginButton } from './ProfileLoginButton';
import { ProfileMenu } from './ProfileMenu';

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
      const ProfileMenuProps = {
        imageSrc: authService.photoSrc,
        wrapRef: this.wrapRef,
        openDropDown: this.state.openDropDown,
        onClickProfile: this.handleClickProfile,
        onCloseDropDown: this.handleCloseDropDown,
      };
      return (
        <div className={styles.rightLinks} ref={this.wrapRef}>
          {authService.isAuth ? (
            <ProfileMenu {...ProfileMenuProps} />
          ) : (
            <ProfileLoginButton />
          )}
        </div>
      );
    }
  }
);
