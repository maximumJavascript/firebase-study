import { Component } from 'react';
import { ReactComponent as FilledStar } from '../../../../assets/icons/FilledStar.svg';
import { ReactComponent as EmptyStar } from '../../../../assets/icons/EmptyStar.svg';
import { authService } from '../../../../auth/auth.service';
import { observer } from 'mobx-react';
import styles from './Star.module.css';
import classNames from 'classnames';

const Star = observer(
  class Star extends Component {
    handleMouseOver = (e) => {
      this.props.onMouseChange(this.props.number);
    };

    handleMouseOut = (e) => {
      this.props.onMouseChange(0);
    };

    handleClick = (e) => {
      this.props.onAddRating(this.props.number);
    };

    render() {
      const handlers = authService.isAuth
        ? {
            onMouseOver: this.handleMouseOver,
            onMouseOut: this.handleMouseOut,
            onClick: this.handleClick,
          }
        : {};

      const isFilled = this.props.isFilled;
      const isSelected = this.props.isSelected;
      const userHovered = this.props.userHovered;
      const starClass = classNames({
        [styles.star]: true,
        [styles.isSelected]: isSelected,
        [styles.isFilled]: isFilled,
      });

      if ((userHovered && isSelected) || (!userHovered && isFilled)) {
        return <FilledStar {...handlers} className={starClass} />;
      }
      return <EmptyStar {...handlers} className={styles.star} />;
    }
  }
);

export { Star };
