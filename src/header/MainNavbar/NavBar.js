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
    // let photoSrc = authService.getSrc();
    // console.log("photoSrc in NavBar", photoSrc);
    // if (!photoSrc) {
    //   photoSrc =
    //     "https://sun9-7.userapi.com/r90oL_k8H2knEzaCqzV57L9GDlahcVwenNU3Sw/--QJZ-RiNV4.jpg";
    // }
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
