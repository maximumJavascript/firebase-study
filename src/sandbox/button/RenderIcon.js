import React from 'react';
import styles from './Button.module.css';
import { ReactComponent as SvgHeaderHome } from '../../../src/assets/icons/SvgHeaderHome.svg';
import { ReactComponent as SvgHeaderLogin } from '../../../src/assets/icons/SvgHeaderLogin.svg';
import { ReactComponent as SvgLogOut } from '../../../src/assets/icons/SvgLogOut.svg';

export class Button extends React.Component {
  renderIcon() {
    switch (this.props.label) {
      case 'Home':
        return <SvgHeaderHome className={styles.headerIcons} />;
      case 'Login':
        return <SvgHeaderLogin className={styles.headerIcons} />;
      case 'Log out':
        return <SvgLogOut className={styles.headerIcons} />;
      default:
        return '';
    }
  }

  render() {
    return (
      <button className={buttonClass}>
        {this.renderIcon()}
        {this.props.label}
      </button>
    );
  }
}
