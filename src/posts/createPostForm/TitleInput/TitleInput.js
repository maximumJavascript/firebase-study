import styles from "./titleInput.module.css";
import React from "react";

class TitleInput extends React.Component {
  render() {
    return (
      <div className={styles.inputTitleContainer}>
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

export default TitleInput;
