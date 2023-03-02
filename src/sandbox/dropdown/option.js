import React from 'react';
import styles from './Dropdown.module.css';
import cn from 'classnames';

export default class Option extends React.Component {
  handleClick = () => {
    this.props.onSelectItem(this.props.optionObj.id);
    this.props.onToggle();
  };

  render() {
    const buttonClass = cn([
      styles.dropdownMenuValue,
      this.props.isSelected ? styles.dropdownSelectedValue : '',
    ]);

    return (
      <div className={buttonClass} onClick={this.handleClick}>
        {this.props.optionObj.label}
      </div>
    );
  }
}
