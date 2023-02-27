import { Component } from 'react';
import { authService } from '../../../../auth/auth.service';
import { observer } from 'mobx-react';
import { StarIcon } from '../../../../assets/icons/SvgStar';
import styles from './Star.module.css';
import classNames from 'classnames';

const Star = observer(
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

    render() {
      const handlers = authService.isAuth
        ? {
            onMouseEnter: this.handleMouseEnter,
            onClick: this.handleClick,
            onMouseMove: this.handleMouseMove,
          }
        : {};

      const userHovered = this.props.userHovered;
      const percSelected = this.props.percSelected;
      const percFilled = this.props.percFilled;
      const starClass = classNames({
        [styles.star]: true,
        [styles.isFilled]: percFilled > 0,
        [styles.isSelected]: percSelected > 0,
      });

      if ((userHovered && percSelected) || (!userHovered && percFilled)) {
        return (
          <StarIcon
            {...handlers}
            filled={userHovered ? percSelected : percFilled}
            className={starClass}
          />
        );
      }
      return <StarIcon {...handlers} className={styles.star} />;
    }
  }
);

export { Star };
