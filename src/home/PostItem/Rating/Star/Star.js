import { Component } from 'react';
import { authService } from '../../../../auth/auth.service';
import { observer } from 'mobx-react';
import { StarIcon } from '../../../../assets/icons/StarIcon';
import styles from './Star.module.css';
import classNames from 'classnames';

export const Star = observer(
  class Star extends Component {
    handleMouseEnter = (e) => {
      this.rect = e.target.getBoundingClientRect();
    };

    handleMouseMove = (e) => {
      const score = this.getScore(e);
      this.props.onMouseChange(score);
    };

    getScore = (e) => {
      const innerLeft = e.clientX - this.rect.left;
      const number = this.props.number;
      return innerLeft > this.rect.width / 2 ? number * 2 : number * 2 - 1;
    };

    handleClick = (e) => {
      const score = this.getScore(e);
      this.props.onAddRating(score);
    };

    get handlers() {
      return authService.isAuth
        ? {
            onMouseEnter: this.handleMouseEnter,
            onClick: this.handleClick,
            onMouseMove: this.handleMouseMove,
          }
        : {};
    }

    get starClass() {
      return classNames({
        [styles.star]: true,
        [styles.isSelected]: this.props.percSelected > 0,
        [styles.isFilled]: this.props.percFilled > 0,
      });
    }

    render() {
      const { userHovered, percSelected, percFilled } = this.props;

      return (
        <StarIcon
          {...this.handlers}
          filled={userHovered ? percSelected : percFilled}
          number={this.props.postId}
          className={this.starClass}
        />
      );
    }
  }
);
