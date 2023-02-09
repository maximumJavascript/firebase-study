import styles from "./headerInput.module.css";
import React from "react";

class HeaderTextInput extends React.Component {
  render() {
    return (
      <div className={styles.inputHeaderContainer}>
        <input
          id="inputHeader"
          className={styles.inputHeader}
          placeholder="Заголовок статьи"
          name="inputHeader"
        ></input>
      </div>
    );
  }
}

export default HeaderTextInput;
