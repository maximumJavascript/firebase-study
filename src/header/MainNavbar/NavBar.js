import React from 'react';
import { CentrNavbar } from '../CentrPartOfNavbar/CentrNavbar';
import { RightNavbar } from '../RightPartOfNavbar/RightNavbar';
import styles from '../Navbar.module.css';
import classNames from 'classnames';

export class NavBar extends React.Component {
  render() {
    const navClasses = classNames(styles.navbarContainer, styles.nav);
    return (
      <header>
        <nav className={navClasses}>
          <CentrNavbar signUserOut={this.props.signUserOut} />
          <RightNavbar photoSrc={this.props.photoSrc} />
        </nav>
      </header>
    );
  }
}
