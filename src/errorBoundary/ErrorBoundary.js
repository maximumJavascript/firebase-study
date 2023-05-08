import { Component } from 'react';
import { PrettyError } from './PrettyError';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.slotError ? this.props.slotError : <PrettyError />;
    }
    return this.props.children;
  }
}
