import React from 'react';
import styles from './Dropdown.module.css';
import { ReactComponent as SvgArrowDown } from '../../assets/icons/SvgArrowDown.svg';
import Option from './Option';
import PropTypes from 'prop-types';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = { isOpen: false, isRotate: false, selectedItemId: undefined };
  }

  toggleIsOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      isRotate: !prevState.isRotate,
    }));
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        isOpen: false,
        isRotate: false,
      });
    }
  };

  render() {
    return (
      <div className={styles.dropdownContainer}>
        <div ref={this.wrapperRef}>
          <div className={styles.dropdownMenu} onClick={this.toggleIsOpen}>
            <div>{this.props.selectedValue}</div>
            <SvgArrowDown
              className={
                this.state.isRotate
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
                  isSelected={this.props.selectedItemIdState === option.id}
                  selectedItemIdState={this.props.selectedItemIdState}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
