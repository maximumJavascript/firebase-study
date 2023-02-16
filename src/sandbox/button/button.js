import React from 'react';
import styles from './button.module.css';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false, isClicked: false };
  }

  handleHover = () => {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered && !prevState.isClicked,
    }));
  };

  render() {
    const hoverClass = this.state.isHovered ? 'btn-hovered' : '';
    const clickClass = this.isClicked ? 'btn-pressed' : '';

    return (
      <div className={styles.sandboxContainer}>
        <h2>Button:</h2>
        <button
          onClick={this.handleHover}
          className={`${styles.btn} ${styles.hoverClass} ${styles.clickClass}`}
        >
          Vsesoki
        </button>
      </div>
    );
  }
}

Button.defaultProps = {
  label: 'Empty button',
};

/*const { isPressed, isHovered, label } = this.props;

const btnClass = classNames("btn", {
  "btn-pressed": isPressed,
  "btn-hovered": !isPressed && isHovered,
}); */
