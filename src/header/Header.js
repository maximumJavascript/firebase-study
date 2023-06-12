import React from 'react';
import { CreatePostButton } from './CreatePostButton/CreatePostButton';
import { Profile } from './Profile/Profile';
import styles from './Header.module.css';
import classNames from 'classnames';
import { Logo } from './Logo';
import { authService } from '../auth/auth.service';

export class Header extends React.Component {
  render() {
    const navClasses = classNames(styles.navbarContainer, styles.nav);
    return (
      <header>
        <nav className={navClasses}>
          <Logo />
          {authService.isAuth && (
            <CreatePostButton signUserOut={this.props.signUserOut} />
          )}
          <Profile photoSrc={this.props.photoSrc} />
        </nav>
      </header>
    );
  }
}
