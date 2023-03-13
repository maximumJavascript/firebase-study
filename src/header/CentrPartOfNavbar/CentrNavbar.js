import React from 'react';
import styles from '../Navbar.module.css';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authService } from '../../auth/auth.service';
import { storageService } from '../../localStorageService/storageService';
import { Button } from '../../../src/sandbox/button/Button';

const CentrNavbar = observer(
  class CentrNavbar extends React.Component {
    render() {
      let isAuth = authService.isAuth;
      return (
        <div className={styles.centerLinks}>
          <Link to="/firebase-study" className={styles.homeContainer}>
            <Button label={'Home'} />
          </Link>
          {!isAuth ? (
            <Link to="/login" className={styles.homeContainer}>
              <Button label={'Login'} />
            </Link>
          ) : (
            <>
              <Link to="/createpost">
                <span className={(styles.navText, styles.createPostText)}>
                  Create Post
                </span>
              </Link>
              <Button
                onClick={authService.handleLogOut}
                className={styles.logOutBtn}
                label={'Log out'}
              />
            </>
          )}
        </div>
      );
    }
  }
);

export default CentrNavbar;
