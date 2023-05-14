import React from 'react';
import LeftNavbar from '../LeftPartOfNavbar/LeftNavbarPart';
import CentrNavbar from '../CentrPartOfNavbar/CentrNavbar';
import RightNavbar from '../RightPartOfNavbar/RightNavbar';
import styles from '../Navbar.module.css';
import classNames from 'classnames';

class NavBar extends React.Component {
  render() {
    const navClasses = classNames(styles.navbarContainer, styles.nav);
    return (
      <header>
        <nav className={navClasses}>
          <LeftNavbar />
          <CentrNavbar signUserOut={this.props.signUserOut} />
          <RightNavbar photoSrc={this.props.photoSrc} />
        </nav>
      </header>
    );
  }
}

export default NavBar;
