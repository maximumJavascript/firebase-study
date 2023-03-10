import React from 'react';
import styles from './Dropdown.module.css';
import { ReactComponent as SvgArrowDown } from '../../assets/icons/SvgArrowDown.svg';
import Option from './Option';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleIsOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        isOpen: false,
      });
    }
  };

  render() {
    const selectedValue = !this.props.selectedItemId
      ? 'Placeholder...'
      : this.props.optionsList.find((elem) => elem.id === this.props.selectedItemId)
          .label;

    return (
      <div className={styles.dropdownContainer}>
        <div ref={this.setWrapperRef}>
          <div className={styles.dropdownMenu} onClick={this.toggleIsOpen}>
            <div>{selectedValue}</div>
            <SvgArrowDown
              className={
                this.state.isOpen
                  ? styles.dropdownMenuIconRotate
                  : styles.dropdownMenuIcon
              }
            />
          </div>
          {this.state.isOpen && (
            <div className={styles.dropdownItems}>
              {this.props.optionsList.map((option) => (
                <Option
                  key={option.id}
                  optionObj={option}
                  onSelectItem={this.props.onSelectItem}
                  onToggle={this.toggleIsOpen}
                  isSelected={this.props.selectedItemId === option.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
