import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  render() {
    return createPortal(this.props.children, modalRoot);
  }
}
