import React from "react";
import { Link } from "react-router-dom";
import styles from "../Navbar.module.css";
import LeftNavbar from "../LeftPartOfNavbar/LeftNavbarPart";
import CentrNavbar from "../CentrPartOfNavbar/CentrNavbar";
import RightNavbar from "../RightPartOfNavbar/RightNavbar";
import { authService } from "../../auth/auth.service";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <header>
        <nav>
          <LeftNavbar />
          <CentrNavbar signUserOut={this.props.signUserOut} />
          <RightNavbar photoSrc={this.props.photoSrc} />
        </nav>
      </header>
    );
  }
}

export default NavBar;
