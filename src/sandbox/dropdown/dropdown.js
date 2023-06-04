import React from 'react';
import styles from './dropdown.module.css';
import { ReactComponent as SvgArrowDown } from '../../assets/icons/SvgArrowDown.svg';
import { Option } from './Option';

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

  handleSelectItem = (selectedItemId) => {
    this.setState({
      selectedItemId,
    });
  };

  render() {
    const selectedValue = !this.state.selectedItemId
      ? 'Placeholder...'
      : this.props.optionsList.find((elem) => elem.id === this.state.selectedItemId)
          .label;

    return (
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownMenu} onClick={this.toggleIsOpen}>
          <div>{selectedValue}</div>
          <SvgArrowDown />
        </div>
        {this.state.isOpen && (
          <div>
            {this.props.optionsList.map((option) => (
              <Option
                key={option.id}
                optionObj={option}
                onSelectItem={this.handleSelectItem}
                onToggle={this.toggleIsOpen}
                isSelected={this.state.selectedItemId === option.id}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
