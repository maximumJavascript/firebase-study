import React from 'react';
import styles from './Button.module.css';
import cn from 'classnames';

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const buttonClass = cn(styles.button, styles.medium, styles.primary);

    return (
      <button className={buttonClass}>
        {this.renderIcon()}
        {this.props.label}
      </button>
    );
  }
}

Button.defaultProps = {
  label: 'Empty button',
};
