import React from "react";
import { AnimalsDropdown } from "./AnimalsDropdown"

export class ClickOutside extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.state = { isOpen: false, isRotate: false };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState((prevState) => ({
        isOpen: false,
        isRotate: false,
      }));
    }
  }

  render() {
    return <div ref={this.wrapperRef}>
    <AnimalsDropdown 
    isOpenState={this.state.isOpen}
    isRotateState={this.state.isRotate}/>
    </div>;
  }
}

