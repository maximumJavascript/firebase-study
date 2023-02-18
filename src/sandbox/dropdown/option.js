import React from 'react';

export default class Option extends React.Component {
  handleOnClick = () => {
    this.props.onSelectItem(this.props.optionObj.id);
    this.props.onToggle();
  };

  render() {
    return <div onClick={this.handleOnClick}>{this.props.optionObj.label}</div>;
  }
}
