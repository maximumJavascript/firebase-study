import { Component } from 'react';
import styles from './titleInput.module.css';

export default class TitleInput extends Component {
  render() {
    return (
      <div className={styles.inputTitleContainer}>
        <input
          className={styles.inputHeader}
          placeholder={this.props.placeholder}
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
          required
        ></input>
      </div>
    );
  }
}
