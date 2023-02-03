import { react } from "@babel/types";
import React from "react";
import { Link } from "react-router-dom";

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
          <ul className="leftLinks">
            <li className="newsLink">
              <a href="#" className="news">
                News
              </a>
            </li>
            <li>
              <a href="#" className="portal">
                Portal
              </a>
            </li>
          </ul>
          <div className="centerLinks">
            <Link to="/" className="homeContainer">
              <span className="navText homeText">Home</span>
            </Link>
            {!this.props.isAuth ? (
              <Link to="/login">
                <button className="loginBtn">
                  <span className="navText loginText">Login</span>
                </button>
              </Link>
            ) : (
              <>
                <Link to="/createpost">
                  <span className="navText createPostText">Create Post</span>
                </Link>
                <button onClick={this.props.signUserOut} className="logOutBtn">
                  <span className="logOutBtnText">Log Out</span>
                </button>
              </>
            )}
          </div>

          <ul className="rightLinks">
            <li className="newsLeftLink">
              <div className="newsContainer">
                <a href="#" className="newsLeft">
                  News
                </a>
                <div className="dash"></div>
              </div>
            </li>
            <li className="blogLink">
              <a className="blog">Blog</a>
            </li>
            <li className="authPicture">
              <img className="authImg" src={photoSrc} />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;
