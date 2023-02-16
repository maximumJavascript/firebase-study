import React from 'react';
import styles from './dropdown.module.css';
import Icon from './icon';
import Option from './Option';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, selectedItemId: 0 };
  }

  toggleClass = () => {
    this.setState((prevState) => ({
      isClicked: !prevState.isClicked,
    }));
  };

  render() {
    return (
      <div className={styles.sandboxContainer}>
        <h2>Dropdown:</h2>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownInput}>
            <div className={styles.dropdownSelectedValue}>
              {!this.state.selectedItemId
                ? 'Placeholder...'
                : this.props.options.find((elem) => elem.id === this.state.selectedItemId)
                    .label}
            </div>
            <Icon />
          </div>
          <Option />
        </div>
      </div>
    );
  }
}

/*
у тебя состояние isOpen true/false и все по логике. верстка еще
выбор итема на клик
еще состояние selectedItemId: string | undefined
*/
