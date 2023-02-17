import React from 'react';
import styles from './dropdown.module.css';
import Icon from './icon';
// import classNames from 'classnames';
// import Option from './option';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, isClicked: 0, selectedItemId: 0 };
  }

  onChangeClass = (id) => {
    this.setState(({ isClicked }) => ({ isClicked: id }));
  };

  onChangeOpen = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  onChangeSelectedItem = () => {
    this.setState(({ selectedItemId }) => ({ selectedItemId: !selectedItemId }));
  };

  render() {
    // const buttonClass = classNames([
    //   styles.dropdownInputValue,
    //   this.state.isClicked === option.id ? styles.dropdownSelectedValue : '',
    // ]);

    return (
      <div className={styles.sandboxContainer}>
        <h2>Dropdown:</h2>
        <div className={styles.dropdownContainer} onClick={this.onChangeOpen}>
          <div className={styles.dropdownInput}>
            <div onClick={this.onChangeSelectedItem}>
              {!this.state.selectedItemId
                ? 'Placeholder...'
                : this.props.options.find((elem) => elem.id === this.state.selectedItemId)
                    .label}
            </div>
            <Icon />
          </div>
          {!this.state.isOpen
            ? this.props.options.map((option) => {
                return (
                  <div
                    key={option.id}
                    onClick={this.onChangeClass(option.id)}
                    className={styles.dropdownSelectedValue}
                  >
                    {option.value}
                  </div>
                );
              })
            : ''}
        </div>
      </div>
    );
  }
}
