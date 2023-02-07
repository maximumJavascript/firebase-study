import React from "react";
import styles from "../Navbar.module.css";
import { Link } from "react-router-dom";

class CentrNavbar extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    return (
      <div className={styles.centerLinks}>
        <Link to="/" className={styles.homeContainer}>
          <span className={(styles.navText, styles.homeText)}>Home</span>
        </Link>
        {!this.props.isAuth ? (
          <Link to="/login">
            <button className={styles.loginBtn}>
              <span className={(styles.navText, styles.loginText)}>Login</span>
            </button>
          </Link>
        ) : (
          <>
            <Link to="/createpost">
              <span className={(styles.navText, styles.createPostText)}>
                Create Post
              </span>
            </Link>
            <button
              onClick={this.props.signUserOut}
              className={styles.logOutBtn}
            >
              <span className={styles.logOutBtnText}>Log Out</span>
            </button>
          </>
        )}
      </div>
    );
  }
}
export default CentrNavbar;
