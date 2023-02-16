import React from 'react';
import styles from './dropdown.module.css';

export default class Option extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.options.map((option) => {
          return (
            <div
              key={option.id}
              className={this.state.isClicked ? styles.activeColor : null}
              onClick={this.toggleClass}
            >
              {option.value}
            </div>
          );
        })}
      </div>
    );
  }
}
