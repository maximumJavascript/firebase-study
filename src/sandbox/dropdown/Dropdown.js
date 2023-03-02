import React from 'react';
import styles from './Dropdown.module.css';
import { ReactComponent as SvgArrowDown } from '../../assets/icons/SvgArrowDown.svg';
import Option from './Option';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, selectedItemId: undefined };
  }

  toggleIsOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownMenu} onClick={this.toggleIsOpen}>
          <div>{this.props.selectedValue}</div>
          <SvgArrowDown />
        </div>
        {this.state.isOpen && (
          <div className={styles.dropdownItems}>
            {this.props.optionsList.map((option) => (
              <Option
                key={option.id}
                optionObj={option}
                onSelectItem={this.props.onSelectItem}
                onToggle={this.toggleIsOpen}
                isSelected={this.props.selectedItemIdState === option.id}
                selectedItemIdState={this.props.selectedItemIdState}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
