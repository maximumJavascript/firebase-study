import { Component } from 'react';
import styles from './AnswerButtonControl.module.css';

export default class AnswerButtonControl extends Component {
  render() {
    return <button type='button'>{this.props.text}</button>;
  }
}
