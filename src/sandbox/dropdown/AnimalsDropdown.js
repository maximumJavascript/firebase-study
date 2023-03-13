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

  handleSelectItem = (selectedItemId) => {
    this.setState({
      selectedItemId,
    });
  };

  render() {
    return (
      <Dropdown
        optionsList={this.optionsList}
        selectedItemId={this.state.selectedItemId}
        onSelectItem={this.handleSelectItem}
      />
    );
  }
}
