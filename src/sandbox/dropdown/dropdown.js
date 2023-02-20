import React from 'react';
import styles from './dropdown.module.css';
import Icon from './icon';
import Option from './option';

export default class PureDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, isClicked: false, selectedItemId: undefined };
  }

  toggleIsOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onChangeClass = () => {
    this.setState(({ isClicked }) => ({
      isClicked: !isClicked,
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
              {this.props.options.map((option) => {
                return (
                  <Option
                    key={option.id}
                    optionObj={option}
                    onSelectItem={this.handleSelectItem}
                    onToggle={this.toggleIsOpen}
                    onChangeClassNames={this.onChangeClass}
                    isClickedState={this.state.isClicked}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

/*
нужно просто инпут с выпадахой
у тебя состояние isOpen true/false и все по логике. верстка еще
выбор итема на клик
еще состояние selectedItemId: string | undefined
*/
