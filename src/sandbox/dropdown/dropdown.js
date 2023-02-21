import React from 'react';
import styles from './Dropdown.module.css';
import Icon from '../../assets/icons/SvgArrowDown';
import Option from './Option';
import optionsList from './optionsList';
import storageService from '../../localStorageService/storageService';

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
      : optionsList.find((elem) => elem.id === this.state.selectedItemId).label;
    localStorage.setItem('selectedItemInStorage', selectedValue);

    return (
      <div className={styles.sandboxContainer}>
        <h2>Dropdown:</h2>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownInput} onClick={this.toggleIsOpen}>
            <div>{localStorage.getItem('selectedItemInStorage')}</div>
            <Icon />
          </div>
          {this.state.isOpen && (
            <div>
              {optionsList.map((option) => (
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
