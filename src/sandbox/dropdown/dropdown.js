import React from 'react';
import styles from './dropdown.module.css';
import Icon from '../../assets/icons/SvgArrowDown';
import Option from './Option';

export default class PureDropdown extends React.Component {
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
      : this.props.options.find((elem) => elem.id === this.state.selectedItemId).label;

    return (
      <div className={styles.sandboxContainer}>
        <h2>PureDropdown:</h2>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownInput} onClick={this.toggleIsOpen}>
            <div>{selectedValue}</div>
            <Icon />
          </div>
          {this.state.isOpen && (
            <div>
              {this.props.options.map((option) => (
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
      </div>
    );
  }
}
