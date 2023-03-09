import React from 'react';
import { Dropdown } from './Dropdown';

export class AnimalsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedItemId: undefined };
  }

  optionsList = [
    { id: 1, value: 'Dog', label: 'Dog' },
    { id: 2, value: 'Cat', label: 'Cat' },
    { id: 3, value: 'Frontender', label: 'Frontender' },
  ];

  handleSelectItem = (optionsList) => {
    this.setState({
      optionsList,
    });
  };

  render() {
    return (
      <Dropdown optionsList={this.optionsList} onSelectItem={this.handleSelectItem} />
    );
  }
}
