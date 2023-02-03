import { react } from "@babel/types";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import LeftNavbar from "../LeftPartOfNavbar/LeftNavbarPart";
import CentrNavbar from "../CentrPartOfNavbar/CentrNavbar";
import RightNavbar from "../RightPartOfNavbar/RightNavbar";
class NavBar extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    let photoSrc = localStorage.getItem("photoSrc");
    if (!photoSrc) {
      photoSrc =
        "https://sun9-7.userapi.com/r90oL_k8H2knEzaCqzV57L9GDlahcVwenNU3Sw/--QJZ-RiNV4.jpg";
    }
    return (
      <header>
        <nav>
          <LeftNavbar />
          <CentrNavbar
            isAuth={this.props.isAuth}
            signUserOut={this.props.signUserOut}
          />
          <RightNavbar photoSrc={photoSrc} />
        </nav>
      </header>
    );
  }
}

export default NavBar;
