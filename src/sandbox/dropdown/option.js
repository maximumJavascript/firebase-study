import React from 'react';
import styles from './dropdown.module.css';
export default class Option extends React.Component {
  handleOnClick = () => {
    this.props.onSelectItem(this.props.optionObj.id);
    this.props.onToggle();
  };

  render() {
    return (
      <div
        className={
          (styles.dropdownInputValue,
          this.state.isClicked ? styles.dropdownSelectedValue : '')
        }
        onClick={this.handleOnClick}
      >
        {this.props.optionObj.label}
      </div>
    );
  }
}
