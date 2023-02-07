import React from "react";
import styles from "../Navbar.module.css";

class RightNavbar extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    return (
      <ul className={styles.rightLinks}>
        <li className={styles.newsLeftLink}>
          <div className={styles.newsContainer}>
            <a href="#" className={styles.newsLeft}>
              News
            </a>
            <div className={styles.dash}></div>
          </div>
        </li>
        <li className={styles.blogLink}>
          <a className={styles.blog} href="#">
            Blog
          </a>
        </li>
        <li className={styles.authPicture}>
          <img className={styles.authImg} src={this.props.photoSrc} />
        </li>
      </ul>
    );
  }
}
export default RightNavbar;
