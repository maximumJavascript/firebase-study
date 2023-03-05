import React from 'react';
import styles from './Dropdown.module.css';
import { ReactComponent as SvgArrowDown } from '../../assets/icons/SvgArrowDown.svg';
import Option from './Option';

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = {
      isOpenState: this.props.isOpenState, 
      isRotateState: this.props.isRotateState,  
      selectedItemId: undefined };
  }

  toggleIsOpen = () => {
    this.setState((prevState) => ({
      isOpenState: !prevState.isOpenState,
      isRotateState: !prevState.isRotateState,
    }));
  };

  render() {
    return (
      <div className={styles.dropdownContainer}>
      <div ref={this.wrapperRef} onClick={this.handleClickOutside}>
        <div className={styles.dropdownMenu} onClick={this.toggleIsOpen}>
          <div>{this.props.selectedValue}</div>
          <SvgArrowDown className={this.state.isRotate ? 
          styles.dropdownMenuIconRotate : styles.dropdownMenuIcon 
          }/>
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
              />
            ))}
          </div>
        )}
        </div>
      </div>
    );
  }
}
