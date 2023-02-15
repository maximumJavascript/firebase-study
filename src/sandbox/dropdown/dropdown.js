import React from "react";
import styles from "./dropdown.module.css";
import Icon from "./icon";

export default class PureDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, selectedItemId: 1 };
  }

  toggleClass = () => {
    this.setState((prevState) => ({
      isClicked: !prevState.isClicked,
    }));
  };

  render() {
    return (
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownInput}>
          <div className="dropdown-selected-value">
            {!this.state.selectedItemId
              ? "Placeholder..."
              : this.props.options.find(
                  (elem) => elem.id === this.state.selectedItemId
                ).label}
            <Icon />
          </div>
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
